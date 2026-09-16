# ALIBI 🕵️‍♀️🎭

Ein mobiles Partyspiel: Zwei Spieler*innen werden verdächtigt – aber nur
eine*r von ihnen ist wirklich schuldig. Beide sehen geheim ihre eigene Rolle,
ohne sich vorher abzusprechen, dann befragt der Rest der Gruppe sie einzeln
und stimmt am Ende ab, wer wirklich schuldig ist.

Gebaut mit [Expo](https://expo.dev), React Native und TypeScript. Läuft auf
iOS und Android (und im Browser). Es gibt kein Backend, keine Registrierung
und keine externen APIs – das gesamte Spiel läuft lokal auf dem Gerät.

## Wie man spielt

1. 3–10 Spielernamen eingeben und einen Modus wählen
2. Die App lost zwei Verdächtige und einen zufälligen Vorfall aus (z. B.
   "der letzte Kuchen ist verschwunden")
3. Das Gerät geht nacheinander an beide Verdächtigen – jede*r sieht **geheim**
   nur die eigene Rolle:
   - **Schuldig** 🔴: bekommt die wahre Geschichte zu sehen und muss sie
     verstecken, ohne sich zu verraten
   - **Unschuldig** 🟢: weiß nichts und muss einfach ehrlich improvisieren
4. Alle anderen sind Ermittler und befragen beide einzeln – die Verdächtigen
   konnten sich **nicht** vorher absprechen, weil keiner wusste, wer schuldig
   ist
5. Die Ermittler einigen sich auf eine Anschuldigung
6. Auflösung: wer war wirklich schuldig, was ist wirklich passiert, und wer
   hat die Runde gewonnen?

## Funktionsumfang (aktueller Stand)

- **Startbildschirm** mit Spiel-Branding im dunklen Party-Look
- **Spieler-Eingabe**: 3 bis 10 Spielernamen hinzufügen/entfernen, mit
  Validierung (Mindestanzahl, eindeutige Namen)
- **Spielmodus-Auswahl**: Klassisch, Chaos-Modus, Speed-Runde
- **Zufällige Auslosung** von zwei Verdächtigen, einem Vorfall-Szenario aus
  einem Katalog von 20 Situationen, und wer von beiden wirklich schuldig ist
- **Geheimer Rollen-Reveal**: sequenzieller Tap-to-reveal-Flow, bei dem jede
  verdächtigte Person nur die eigene Rolle sieht, bevor das Gerät an die
  nächste Person weitergegeben wird
- **Echte Anschuldigung**: die Ermittler entscheiden sich für eine*n
  Verdächtige*n statt nur vage abzustimmen
- **Auflösung mit Payoff**: zeigt den echten Hergang und ob die Ermittler
  richtiglagen, plus laufenden Punktestand der Session
- **Navigation** zwischen allen Bildschirmen über React Navigation
  (Native Stack)
- **Nächste Runde** direkt aus dem Ergebnis-Bildschirm (neue Verdächtige,
  neues Szenario, neue Schuldfrage), ohne neu zu starten

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
│   │   └── scenarios.ts        # Katalog der Vorfälle + geheime Wahrheit pro Szenario
│   ├── navigation/
│   │   └── AppNavigator.tsx    # Native-Stack-Navigator + Dark Theme
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── PlayerSetupScreen.tsx
│   │   ├── ModeSelectScreen.tsx
│   │   ├── RevealScreen.tsx    # Zeigt Verdächtige + Vorfall
│   │   ├── RoleRevealScreen.tsx# Geheimer Tap-to-reveal-Flow pro Verdächtiger*m
│   │   ├── VotingScreen.tsx    # Anschuldigung wählen
│   │   └── ResultScreen.tsx    # Auflösung + Punktestand
│   ├── theme/
│   │   ├── colors.ts           # Farbpalette (dunkles Party-Design)
│   │   └── spacing.ts          # Abstände & Radien
│   ├── types/
│   │   ├── game.ts             # Spielmodi, Suspects/Scenario/Verdict-Typen
│   │   └── navigation.ts       # RootStackParamList für type-safe Navigation
│   └── utils/
│       └── random.ts           # Zufällige Auswahl: Verdächtige, Szenario, Schuldfrage
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
2. Auf **„Spiel starten“** tippen, 3–10 Spielernamen eingeben
3. Modus wählen, auf **„Verdächtige auslosen“** tippen
4. Prüfen, dass zwei Verdächtige **und** ein Vorfall angezeigt werden, aber
   nicht, wer schuldig ist
5. Auf **„Geheime Rollen ansehen“** tippen und für beide Verdächtigen den
   Tap-to-reveal-Flow durchgehen – prüfen, dass genau eine Person „schuldig“
   und die andere „unschuldig“ angezeigt bekommt
6. Auf **„Weiter zur Abstimmung“** tippen, eine der beiden Personen
   beschuldigen
7. Prüfen, dass der Ergebnis-Bildschirm die richtige/falsche Anschuldigung,
   die echte Geschichte und einen Punktestand (1:0 o. ä.) anzeigt
8. Über **„Nächste Runde“** mehrfach spielen und prüfen, dass sich der
   Punktestand richtig hochzählt und die Schuldfrage jedes Mal neu ausgelost
   wird
9. Über **„Spiel beenden“** zum Startbildschirm zurückkehren und ein neues
   Spiel starten – der Punktestand muss dabei auf 0:0 zurückgesetzt sein

## Geplante nächste Schritte

- Timer-Umsetzung für die Speed-Runde
- Mehr Rollen bei größeren Gruppen (z. B. zwei Schuldige, ein*e Mitwisser*in)
- Soundeffekte und Übergangsanimationen
- Persistente letzte Spielerliste (lokal, ohne Backend)
