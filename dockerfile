# Verwenden Sie das offizielle Node.js-Image
FROM node:14

# Erstellen und wechseln Sie in das App-Verzeichnis
WORKDIR /usr/src/app

# Kopieren Sie die Abhängigkeitsmanifestdateien in das Container-Image
COPY package*.json ./

# Installieren Sie Abhängigkeiten
RUN npm install

# Kopieren Sie den Anwendungscode in das Container-Image
COPY . .

# Stellen Sie sicher, dass die Datenbankdatei erstellt wird
RUN mkdir -p database && touch database/notes.db

# Setzen Sie Umgebungsvariablen
ENV PORT=3000

# Starten Sie den Webdienst beim Container-Start
CMD [ "node", "app.js" ]

# Informieren Sie Docker darüber, dass der Container auf dem angegebenen Port lauscht
EXPOSE 3000
