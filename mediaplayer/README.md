# SoundCloud - Media Player Component

This project emulates the top module of the SoundCloud website.  This includes a navigation bar that let's you search for songs and a media player component.  The media player component displays the details about the song (title, artist, category, date created, and album art) and it displays a waveform that displays the amplitude at a given time and fills in as the song plays.

## Getting Started

### Installing

Run npm install to install necessary modules

```
npm install
```

Run npm start to run web server
```
npm start
```

Run npm run db:setup to seed database with 100 songs.  ids range from 1 to 100

```
npm run db:setup
```

Search hashes the query into a number 1-100 and returns the song stored in the database with the matching id.