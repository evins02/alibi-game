# ALIBI 🕵️‍♀️🎭

Ein mobiles Partyspiel: Zwei zufällig ausgeloste Verdächtige müssen sich ein
gemeinsames Alibi ausdenken, während der Rest der Gruppe sie befragt und die
Widersprüche sucht.

Gebaut mit [Expo](https://expo.dev), React Native und TypeScript. Läuft auf
iOS und Android (und im Browser). Es gibt kein Backend, keine Registrierung
und keine externen APIs – das gesamte Spiel läuft lokal auf dem Gerät.

## Funktionsumfang (aktueller Stand)

- **Startbildschirm** mit Spiel-Branding im dunklen Party-Look
- **Spieler-Eingabe**: 3 bis 10 Spielernamen hinzufügen/entfernen, mit
  Validierung (Mindestanzahl, eindeutige Namen)
- **Spielmodus-Auswahl**: Klassisch, Chaos-Modus, Speed-Runde
- **Zufällige Auslosung** von genau zwei Verdächtigen aus der Spielerliste
- **Navigation** zwischen allen Bildschirmen über React Navigation
  (Native Stack)
- **Neue Auslosung** direkt aus dem Ergebnis-Bildschirm, ohne neu zu starten

## Projektstruktur

```
alibi-game/
├── App.tsx                     # Einstiegspunkt, bindet Navigation ein
├── index.ts                    # Expo Root-Registrierung
├── app.json                    # Expo-Konfiguration (Name, Icons, Theme)
├── src/
│   ├── components/
│   │   ├── PartyButton.tsx     # Wiederverwendbarer Button (primary/secondary/ghost)
│   │   └── ScreenContainer.tsx # Safe-Area-Wrapper mit dunklem Hintergrund
│   ├── navigation/
│   │   └── AppNavigator.tsx    # Native-Stack-Navigator + Dark Theme
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── PlayerSetupScreen.tsx
│   │   ├── ModeSelectScreen.tsx
│   │   └── RevealScreen.tsx
│   ├── theme/
│   │   ├── colors.ts           # Farbpalette (dunkles Party-Design)
│   │   └── spacing.ts          # Abstände & Radien
│   ├── types/
│   │   ├── game.ts             # Spielmodi, Suspects-Typ
│   │   └── navigation.ts       # RootStackParamList für type-safe Navigation
│   └── utils/
│       └── random.ts           # Zufällige Auswahl der zwei Verdächtigen
└── assets/                      # App-Icons, Splash-Screen
```

## Voraussetzungen

- [Node.js](https://nodejs.org/) 20 oder neuer
- npm (liegt Node bei)
- Die [Expo Go](https://expo.dev/go) App auf einem iOS- oder Android-Gerät
  (empfohlen für schnelles Testen ohne native Toolchains), **oder**
  - Xcode + iOS-Simulator (nur macOS) für den iOS-Simulator
  - Android Studio + ein Android-Emulator für den Android-Emulator

## Installation

```bash
npm install
```

## App starten

```bash
npm start
```

Das öffnet die Expo Developer Tools im Terminal/Browser. Von dort aus:

- **Mit dem eigenen Handy testen**: QR-Code mit der Expo-Go-App scannen
  (iOS: Kamera-App, Android: Expo-Go-App)
- **iOS-Simulator** (nur macOS): `npm run ios`
- **Android-Emulator**: `npm run android`
- **Im Browser** (schneller Zwischenstand, nicht der finale Look):
  `npm run web` (benötigt zusätzlich `react-dom` und `react-native-web`,
  siehe Hinweis der Expo-CLI)

## Testen / Prüfen

Aktuell gibt es noch keine automatisierten Tests. Zum Prüfen der
Codequalität stehen folgende Befehle zur Verfügung:

```bash
# TypeScript-Typprüfung (keine Ausgabe = keine Fehler)
npx tsc --noEmit

# Projekt-Gesundheitscheck (Abhängigkeiten, Konfiguration)
npx expo-doctor
```

Manueller Test-Ablauf für das Spiel:

1. `npm start` ausführen und App auf Gerät/Emulator öffnen
2. Auf **„Spiel starten“** tippen
3. 3–10 Spielernamen eingeben (Namen müssen eindeutig sein)
4. Einen Spielmodus auswählen und auf **„Verdächtige auslosen“** tippen
5. Prüfen, dass zwei unterschiedliche Spieler als Verdächtige angezeigt
   werden
6. Über **„Neue Auslosung“** eine erneute Zufallsauswahl testen
7. Über **„Zurück zum Start“** zum Startbildschirm zurückkehren

## Geplante nächste Schritte

- Rollen-/Frage-Katalog für die Befragung
- Timer-Umsetzung für die Speed-Runde
- Soundeffekte und Übergangsanimationen
- Persistente letzte Spielerliste (lokal, ohne Backend)
