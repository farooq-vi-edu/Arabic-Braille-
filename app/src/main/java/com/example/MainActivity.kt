package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.ViewGroup
import android.speech.tts.TextToSpeech
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme
import java.util.Locale

class MainActivity : ComponentActivity(), TextToSpeech.OnInitListener {
  private var tts: TextToSpeech? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    tts = TextToSpeech(this, this)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
          ArabicBrailleAppView(
            modifier = Modifier.padding(innerPadding),
            onSpeak = { text, langCode -> speakNative(text, langCode) },
            onExport = { content, filename -> exportTextFile(content, filename) },
            onVibrate = { durationMs -> triggerVibrate(durationMs) }
          )
        }
      }
    }
  }

  private fun triggerVibrate(durationMs: Long) {
    try {
      val vibrator = getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
      if (vibrator != null && vibrator.hasVibrator()) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          vibrator.vibrate(VibrationEffect.createOneShot(durationMs.coerceIn(10, 500), VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
          @Suppress("DEPRECATION")
          vibrator.vibrate(durationMs.coerceIn(10, 500))
        }
      }
    } catch (_: Exception) {}
  }

  override fun onInit(status: Int) {
    if (status == TextToSpeech.SUCCESS) {
      val urLocale = Locale("ur", "PK")
      val res = tts?.setLanguage(urLocale)
      if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
        val urSimple = Locale("ur")
        val res2 = tts?.setLanguage(urSimple)
        if (res2 == TextToSpeech.LANG_MISSING_DATA || res2 == TextToSpeech.LANG_NOT_SUPPORTED) {
          tts?.setLanguage(Locale.US)
        }
      }
    }
  }

  private fun speakNative(text: String, langCode: String) {
    try {
      if (tts != null) {
        val targetLocale = if (langCode.startsWith("en")) Locale.US else Locale("ur", "PK")
        val result = tts?.setLanguage(targetLocale)
        if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
          val urSimple = Locale("ur")
          val res2 = tts?.setLanguage(urSimple)
          if (res2 == TextToSpeech.LANG_MISSING_DATA || res2 == TextToSpeech.LANG_NOT_SUPPORTED) {
            tts?.setLanguage(Locale.US)
          }
        }
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "UrduBrailleTTS")
      }
    } catch (_: Exception) {}
  }

  fun exportTextFile(content: String, filename: String) {
    try {
      val sendIntent = android.content.Intent().apply {
        action = android.content.Intent.ACTION_SEND
        putExtra(android.content.Intent.EXTRA_TEXT, content)
        putExtra(android.content.Intent.EXTRA_TITLE, filename)
        type = "text/plain"
      }
      val shareIntent = android.content.Intent.createChooser(sendIntent, "Export Braille Embosser File")
      shareIntent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
      startActivity(shareIntent)
    } catch (_: Exception) {}
  }

  override fun onDestroy() {
    tts?.stop()
    tts?.shutdown()
    super.onDestroy()
  }
}

class AndroidTtsBridge(private val onSpeak: (String, String) -> Unit) {
  @JavascriptInterface
  fun speak(text: String, lang: String) {
    onSpeak(text, lang)
  }
}

class AndroidEmbosserBridge(private val onExport: (String, String) -> Unit) {
  @JavascriptInterface
  fun exportFile(content: String, filename: String) {
    onExport(content, filename)
  }
}

class AndroidHapticBridge(private val onVibrate: (Long) -> Unit) {
  @JavascriptInterface
  fun vibrate(milliseconds: Long) {
    onVibrate(milliseconds)
  }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun ArabicBrailleAppView(
  modifier: Modifier = Modifier,
  onSpeak: (String, String) -> Unit,
  onExport: (String, String) -> Unit,
  onVibrate: (Long) -> Unit
) {
  AndroidView(
    modifier = modifier
      .fillMaxSize()
      .testTag("arabic_braille_webview"),
    factory = { context ->
      WebView(context).apply {
        layoutParams = ViewGroup.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.MATCH_PARENT
        )
        setBackgroundColor(android.graphics.Color.parseColor("#051C15"))
        addJavascriptInterface(AndroidTtsBridge(onSpeak), "AndroidTTS")
        addJavascriptInterface(AndroidEmbosserBridge(onExport), "AndroidEmbosser")
        addJavascriptInterface(AndroidHapticBridge(onVibrate), "AndroidHaptic")
        settings.apply {
          javaScriptEnabled = true
          domStorageEnabled = true
          allowFileAccess = true
          allowContentAccess = true
          @Suppress("DEPRECATION")
          allowFileAccessFromFileURLs = true
          @Suppress("DEPRECATION")
          allowUniversalAccessFromFileURLs = true
          mediaPlaybackRequiresUserGesture = false
          cacheMode = WebSettings.LOAD_NO_CACHE
          clearCache(true)
          databaseEnabled = true
          useWideViewPort = true
          loadWithOverviewMode = true
        }
        webChromeClient = object : WebChromeClient() {
          override fun onConsoleMessage(consoleMessage: android.webkit.ConsoleMessage?): Boolean {
            consoleMessage?.let {
              android.util.Log.d("ArabicBrailleWebView", "${it.message()} -- From line ${it.lineNumber()} of ${it.sourceId()}")
            }
            return true
          }
        }
        webViewClient = object : WebViewClient() {
          override fun onRenderProcessGone(view: WebView?, detail: RenderProcessGoneDetail?): Boolean {
            android.util.Log.w(
              "ArabicBrailleWebView",
              "Render process gone (didCrash=${detail?.didCrash()}). Recovering WebView."
            )
            view?.let {
              (it.parent as? ViewGroup)?.removeView(it)
              it.destroy()
            }
            return true
          }

          override fun onReceivedError(
            view: WebView?,
            errorCode: Int,
            description: String?,
            failingUrl: String?
          ) {
            android.util.Log.w("ArabicBrailleWebView", "WebView error: $description ($errorCode) for $failingUrl")
          }
        }
        loadUrl("file:///android_asset/arabic_braille/index.html")
      }
    },
    onRelease = { webView ->
      webView.stopLoading()
      webView.destroy()
    }
  )
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
  Text(text = "Hello $name!", modifier = modifier)
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
  MyApplicationTheme { Greeting("Android") }
}

