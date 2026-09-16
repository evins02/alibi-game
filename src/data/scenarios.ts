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
      'Gestern Abend gegen 22 Uhr ist auf der Party plötzlich der letzte Kuchen spurlos verschwunden.',
    secretDetail:
      'Du hattest Heißhunger, hast ihn allein im Bad gegessen und die Verpackung im Nachbargarten versteckt.',
  },
  {
    incident:
      'Heute Nachmittag wurde im Wohnzimmer die teure Vase zerbrochen gefunden – niemand will es gewesen sein.',
    secretDetail:
      'Du bist beim Herumalbern dagegengestoßen, hast die Scherben schnell weggeräumt und nichts gesagt.',
  },
  {
    incident:
      'Vor einer Stunde wurde das WLAN-Passwort ohne Ansage geändert, und alle sitzen offline da.',
    secretDetail:
      'Du wolltest kurz ungestört sein und hast das Passwort geändert, weil dich die Gruppenchat-Nachrichten genervt haben.',
  },
  {
    incident:
      'Letzten Samstag um Mitternacht wurde die Musikanlage im Partykeller lautstark kaputt gestellt.',
    secretDetail:
      'Du wolltest zeigen, dass du die Lautstärke voll aufdrehen kannst, und hast dabei einen Lautsprecher überlastet.',
  },
  {
    incident:
      'Heute Morgen um 8 Uhr war die komplette Chipstüte schon leer, obwohl sie erst gestern geöffnet wurde.',
    secretDetail:
      'Du konntest nachts nicht schlafen, bist runter in die Küche und hast die ganze Tüte allein leer gegessen.',
  },
  {
    incident:
      'Gegen 23 Uhr ist auf dem Parkplatz ein Auto sehr schief eingeparkt worden – quer über zwei Plätze.',
    secretDetail:
      'Du hattest es eilig, weil du aufs Klo musstest, und hast dir keine Zeit fürs richtige Einparken genommen.',
  },
  {
    incident:
      'Vor Kurzem wurde ein extrem peinliches Foto aus der Gruppe in den Chat gepostet.',
    secretDetail:
      'Du fandest das Foto zu witzig, um es für dich zu behalten, und hast es ohne nachzudenken geteilt.',
  },
  {
    incident:
      'Heute wurde die geheime Zutat aus dem Kühlschrank geklaut, kurz bevor das Essen fertig war.',
    secretDetail:
      'Du wolltest heimlich probieren, wie sie pur schmeckt, und hast am Ende die ganze Portion aufgegessen.',
  },
  {
    incident:
      'Gestern Abend ist mitten in der Ruhephase der Feueralarm ausgelöst worden – aus Versehen oder Absicht?',
    secretDetail:
      'Du hast in der Küche heimlich Popcorn gemacht und dabei den Rauchmelder ausgelöst.',
  },
  {
    incident:
      'Vor einer halben Stunde wurde die Kaffeekasse geplündert, und es fehlt genau der Betrag für zwei Eis.',
    secretDetail:
      'Du hattest kein Bargeld dabei und hast dir das Geld "geliehen", ohne es aufzuschreiben.',
  },
  {
    incident:
      'Heute Nachmittag ist der Hund der Nachbarn plötzlich unbeaufsichtigt durchs Treppenhaus spaziert.',
    secretDetail:
      'Du hast die Tür offen gelassen, weil du kurz was aus dem Auto holen wolltest, und der Hund ist einfach raus.',
  },
  {
    incident:
      'Letzte Nacht wurde die komplett aufgebaute Zelt-Deko im Garten wieder abgebaut – ohne dass es jemand zugeben will.',
    secretDetail:
      'Du dachtest, es sollte aufgeräumt werden, bevor es regnet, und hast alles allein wieder abgebaut.',
  },
  {
    incident:
      'Vor Kurzem wurde beim Gruppenfoto absichtlich die Grimasse geschnitten, die alle ruiniert hat.',
    secretDetail:
      'Du fandest das Foto zu ernst und wolltest es witziger machen, ohne vorher jemanden zu fragen.',
  },
  {
    incident:
      'Heute Morgen war plötzlich der Kühlschrank leer geräumt, kurz bevor das Frühstück geplant war.',
    secretDetail:
      'Du hast spätnachts alles durchsucht, weil du Hunger hattest, und am Ende fast alles selbst gegessen.',
  },
  {
    incident:
      'Gestern wurde mitten im Film laut über das Ende gespoilert, bevor alle fertig geschaut hatten.',
    secretDetail:
      'Du hattest den Film schon gesehen und es ist dir einfach so rausgerutscht, ohne nachzudenken.',
  },
  {
    incident:
      'Vor einer Stunde ist auf mysteriöse Weise die Fernbedienung im Gefrierfach aufgetaucht.',
    secretDetail:
      'Du hast sie aus Spaß dort versteckt, um zu sehen, wie lange es dauert, bis sie jemand findet.',
  },
  {
    incident:
      'Heute Abend wurde beim Kartenspiel eindeutig geschummelt – aber wer genau?',
    secretDetail:
      'Du hast heimlich eine Karte nachgeschaut, weil du unbedingt gewinnen wolltest.',
  },
  {
    incident:
      'Vor Kurzem wurde die Lieblingstasse von jemandem klammheimlich zerbrochen und einfach weggeräumt.',
    secretDetail:
      'Sie ist dir beim Abwaschen aus der Hand gerutscht, und du hast die Scherben schnell im Müll versteckt.',
  },
  {
    incident:
      'Gestern Nacht ist die Balkontür stundenlang offen geblieben, und die ganze Wohnung war eiskalt.',
    secretDetail:
      'Du wolltest kurz draußen frische Luft schnappen und hast danach völlig vergessen, die Tür zu schließen.',
  },
  {
    incident:
      'Heute wurde ohne Erlaubnis das letzte Stück Pizza aus der Box direkt vor der Bestellung der Rest-Lieferung gegessen.',
    secretDetail:
      'Du dachtest, es fällt nicht auf, wenn du es schnell isst, bevor jemand fragt, wem es gehört.',
  },
];
