import type { Scenario } from '../types/game';

/**
 * Vorgefertigte Alibi-Situationen. `incident` bekommen alle zu sehen,
 * `secretDetail` nur der/die tatsächlich schuldige Verdächtige – das ist
 * die Wahrheit, die er/sie verstecken muss, während der/die Unschuldige
 * ehrlich improvisiert, ohne die Details zu kennen.
 */
export const SCENARIOS: Scenario[] = [
  {
    incident:
      'Im Gruppenchat ist heute Nacht eine super cringe Sprachnachricht aufgetaucht, die eigentlich privat bleiben sollte.',
    secretDetail:
      'Du hast sie im Halbschlaf aus Versehen in den falschen Chat geschickt.',
  },
  {
    incident:
      'Jemand hat den Serien-Cliffhanger von letzter Nacht schon im Gruppenchat gespoilert, bevor alle fertig geschaut hatten.',
    secretDetail:
      'Deine Reaction war einfach zu groß, du konntest nicht warten und hast drauflos getippt.',
  },
  {
    incident:
      'Der Insta-Streak mit der ganzen Gruppe ist heute Morgen plötzlich gerissen.',
    secretDetail:
      'Dein Akku ist nachts leer gegangen, und du hast komplett verpennt, rechtzeitig zu snappen.',
  },
  {
    incident:
      'Auf der Story von gestern ist ein richtig peinliches Video aufgetaucht, das eigentlich keiner sehen sollte.',
    secretDetail:
      'Du fandest es zu lustig und hast es gepostet, ohne nachzudenken, wer es alles sieht.',
  },
  {
    incident:
      'Das gemeinsame Streaming-Passwort wurde heute geändert, ohne dass jemand Bescheid gesagt hat.',
    secretDetail:
      'Du dachtest, es schauen zu viele Leute gleichzeitig, und hast es einfach geändert.',
  },
  {
    incident:
      'Beim letzten Squad-Abend hat jemand mitten im wichtigsten Match einfach disconnected.',
    secretDetail:
      'Dein Handy hat geklingelt und du bist rangegangen, ohne Bescheid zu sagen.',
  },
  {
    incident:
      'Jemand hat den Rest der Pizza aufgegessen, bevor der Nachschlag überhaupt geliefert wurde.',
    secretDetail:
      'Du hattest richtig Hunger nach dem Sport und konntest einfach nicht warten.',
  },
  {
    incident:
      'In der Gruppen-Story ist ein Foto aufgetaucht, auf dem jemand richtig unvorteilhaft aussieht.',
    secretDetail:
      'Du fandest das Foto zu lustig, um es nicht zu posten, und hast nicht weiter nachgedacht.',
  },
  {
    incident:
      'Der gemeinsame Musik-Account hat plötzlich eine komplett cringe Playlist in "Zuletzt gehört".',
    secretDetail:
      'Du hast dich heimlich eingeloggt, um deine Lieblingssongs zu hören, und vergessen, dass alle es sehen.',
  },
  {
    incident:
      'Mitten in der Stille im Unterricht ist plötzlich laut ein Handy losgegangen.',
    secretDetail:
      'Du hast vergessen, den Ton auszuschalten, weil du kurz vorher noch getippt hast.',
  },
  {
    incident:
      'Die Kopfhörer von jemandem sind spurlos verschwunden – zuletzt lagen sie auf dem Tisch.',
    secretDetail:
      'Du hast sie kurz ausprobiert und danach total vergessen, wo du sie hingelegt hast.',
  },
  {
    incident:
      'In der Gruppen-Bio steht plötzlich ein komplett anderer, sehr cringe Text.',
    secretDetail:
      'Du hattest kurz Zugriff aufs Konto und dachtest, das wäre ein guter Prank.',
  },
  {
    incident:
      'Jemand hat den Highscore im gemeinsamen Handyspiel über Nacht komplett pulverisiert.',
    secretDetail:
      'Du konntest nicht schlafen und hast heimlich stundenlang weitergezockt.',
  },
  {
    incident:
      'Ein Video ist weiterverbreitet worden, das eigentlich nur im engsten Kreis bleiben sollte.',
    secretDetail:
      'Du hast es geteilt, weil du dachtest, es sieht sowieso keiner Wichtiges.',
  },
  {
    incident:
      'Der letzte Energydrink aus der gemeinsamen Vorratskiste ist spurlos weg.',
    secretDetail: 'Du hattest Bock drauf und hast einfach zugegriffen, ohne zu fragen.',
  },
  {
    incident:
      'Im Gruppenchat ist versehentlich ein Sprachmemo gelandet, das eigentlich für jemand ganz anderen gedacht war.',
    secretDetail: 'Du hast dich vertippt und den falschen Chat erwischt.',
  },
  {
    incident:
      'In der Fotogalerie vom gemeinsamen Ausflug ist plötzlich ein Foto, das komplett fehl am Platz ist.',
    secretDetail:
      'Du hast beim Fotomachen aus Versehen den Auslöser zu oft gedrückt.',
  },
  {
    incident:
      'Jemand hat das Standort-Teilen ausgeschaltet, kurz bevor sich alle treffen wollten.',
    secretDetail:
      'Du wolltest kurz allein sein, hast es ausgemacht und dann vergessen, es wieder anzuschalten.',
  },
  {
    incident:
      'In der Gruppenumfrage ist plötzlich eine total unpassende Antwort aufgetaucht.',
    secretDetail:
      'Du hast aus Spaß was Falsches reingetippt, ohne zu denken, dass es ernst genommen wird.',
  },
  {
    incident:
      'Der Gruppenchat-Name wurde über Nacht in etwas völlig Peinliches umbenannt.',
    secretDetail:
      'Du fandest das lustig und hast es geändert, kurz bevor du eingeschlafen bist.',
  },
];
