package com.example.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = Emerald80,
    secondary = Gold80,
    tertiary = EmeraldGrey80,
    background = SurfaceDark,
    surface = CardDark,
    onPrimary = Color(0xFF003825),
    onBackground = Color(0xFFE1E7E2),
    onSurface = Color(0xFFE1E7E2)
)

private val LightColorScheme = lightColorScheme(
    primary = Emerald40,
    secondary = Gold40,
    tertiary = EmeraldGrey40,
    background = SurfaceLight,
    surface = CardLight,
    onPrimary = Color.White,
    onBackground = Color(0xFF161D19),
    onSurface = Color(0xFF161D19)
)

@Composable
fun UrduBrailleTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}

@Composable
fun MyApplicationTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    UrduBrailleTheme(darkTheme = darkTheme, content = content)
}

