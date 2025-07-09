package com.videoeditor

import android.content.ContentValues
import android.content.Context
import android.net.Uri
import android.os.Environment
import android.provider.MediaStore
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.File
import java.io.FileInputStream
import java.io.OutputStream

class MediaScannerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MediaScannerModule"
    }

    @ReactMethod
    fun saveVideoToGallery(videoPath: String, promise: Promise) {
        try {
            val videoFile = File(videoPath)
            if (!videoFile.exists()) {
                promise.reject("FILE_NOT_FOUND", "Video file not found")
                return
            }

            val context = reactApplicationContext
            val contentValues = ContentValues().apply {
                put(MediaStore.Video.Media.DISPLAY_NAME, videoFile.name)
                put(MediaStore.Video.Media.MIME_TYPE, "video/mp4")
                put(MediaStore.Video.Media.RELATIVE_PATH, Environment.DIRECTORY_DCIM)
            }

            val contentResolver = context.contentResolver
            val uri = contentResolver.insert(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, contentValues)

            uri?.let { videoUri ->
                contentResolver.openOutputStream(videoUri)?.use { outputStream ->
                    FileInputStream(videoFile).use { inputStream ->
                        inputStream.copyTo(outputStream)
                    }
                }
                promise.resolve(videoUri.toString())
            } ?: run {
                promise.reject("INSERT_FAILED", "Failed to insert video into MediaStore")
            }
        } catch (e: Exception) {
            promise.reject("SAVE_ERROR", e.message, e)
        }
    }
} 