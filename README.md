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
- **Szenario-Generator**: zu jeder Runde wird zufällig ein Vorfall aus einem
  Katalog von 20 Situationen gezogen, für den die Verdächtigen ein Alibi
  erfinden müssen
- **Abstimmungs- & Ergebnis-Runde**: nach der Befragung stimmt die Gruppe ab,
  ob das Alibi überzeugt hat, danach zeigt ein Ergebnis-Bildschirm den
  Rundensieger und den laufenden Punktestand der Session an
- **Navigation** zwischen allen Bildschirmen über React Navigation
  (Native Stack)
- **Neue Runde** direkt aus dem Ergebnis-Bildschirm (neue Verdächtige *und*
  neues Szenario), ohne neu zu starten

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
│   ├── context/
│   │   └── GameSessionContext.tsx # Punktestand über die laufende Session
│   ├── data/
│   │   └── scenarios.ts        # Katalog der Alibi-Vorfälle
│   ├── navigation/
│   │   └── AppNavigator.tsx    # Native-Stack-Navigator + Dark Theme
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── PlayerSetupScreen.tsx
│   │   ├── ModeSelectScreen.tsx
│   │   ├── RevealScreen.tsx
│   │   ├── VotingScreen.tsx
│   │   └── ResultScreen.tsx
│   ├── theme/
│   │   ├── colors.ts           # Farbpalette (dunkles Party-Design)
│   │   └── spacing.ts          # Abstände & Radien
│   ├── types/
│   │   ├── game.ts             # Spielmodi, Suspects-/Verdict-Typ
│   │   └── navigation.ts       # RootStackParamList für type-safe Navigation
│   └── utils/
│       └── random.ts           # Zufällige Auswahl von Verdächtigen & Szenario
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
5. Prüfen, dass zwei unterschiedliche Spieler als Verdächtige **und** ein
   Vorfall-Szenario angezeigt werden
6. Auf **„Weiter zur Abstimmung“** tippen, eine der beiden Optionen wählen
7. Prüfen, dass der Ergebnis-Bildschirm den richtigen Sieger und einen
   Punktestand (1:0 o. ä.) anzeigt
8. Über **„Nächste Runde“** mehrfach spielen und prüfen, dass sich der
   Punktestand richtig hochzählt
9. Über **„Spiel beenden“** zum Startbildschirm zurückkehren und ein neues
   Spiel starten – der Punktestand muss dabei auf 0:0 zurückgesetzt sein

## Geplante nächste Schritte

- Timer-Umsetzung für die Speed-Runde
- Mehr Rollen bei größeren Gruppen (z. B. dritter Verdächtiger, Detektiv)
- Soundeffekte und Übergangsanimationen
- Persistente letzte Spielerliste (lokal, ohne Backend)
