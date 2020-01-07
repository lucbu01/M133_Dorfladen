# M133 Dorfladen
TypeScript Projekt im Modul 133 von Luca Bucher

## Anleitung um Server zu starten

### NodeJS
NodeJS muss installiert sein. Die kommandos `node -v` und `npm -v` müssen die jeweiligen Versionen von NodeJS und npm ausgeben. Wenn dies nicht der Fall ist, muss NodeJS installiert werden. [Download NodeJS](https://nodejs.org/)

### tsc und angular
Die npm Packete tsc und @angular/cli müssen global installiert sein. Ist dies nicht der Fall, können sie mit folgenden Kommandos installiert werden:
```bash
npm i -g tsc
```
```bash
npm i -g @angular/cli
```

### npm Packete
Alle npm Packete vom Projekt sind in den Files /package.json und /frontend/package.json zusammengefasst und können im jeweiligen Order einzeln mit `npm istall` installiert werden. Befindet man sich mit der Konsole im root-Projektorder kann man folgenden Befehl ausführen, um alle Dependencies von Frontend und Backend zu installieren:
```bash
npm run installAll
```

### Server starten
Wurden alle oben aufgeführte Schritte erfolgreich abgeschlossen, kann der Server gestartet werden. Dafür muss man sich mit der Konsole im root-Projektorder befinden und folgenden Befehl eingeben:
```bash
npm start
```
