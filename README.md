# MusicPlayer 🎵

A modern, responsive music player web application with playlist management and streaming capabilities. Built with vanilla JavaScript, HTML, and CSS.

## Features

- 🎶 **Music Playback**: Play, pause, next, previous controls
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎵 **Playlist Management**: Multiple playlists with custom covers and descriptions
- 🔊 **Volume Control**: Adjustable volume with mute functionality
- ⏱️ **Progress Tracking**: Visual progress bar and time display
- 💾 **Caching**: Efficient playlist loading with caching
- 🔔 **Notifications**: User-friendly feedback system
- 🎨 **Modern UI**: Spotify-inspired dark theme

## Project Structure

```
MusicPlayer/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── style.css           # Main stylesheet
├── utility.css         # Utility classes
├── assets/             # SVG icons and images
│   ├── Bar/            # Navigation arrows
│   ├── navbar/         # Navigation icons
│   ├── playbar/        # Music controls
│   ├── playlist/       # Playlist icons
│   └── sidebar/        # Sidebar icons
└── Songs/              # Music files and playlists
    ├── playlist1/      # Sample playlist
    ├── playlist2/      # Sample playlist
    └── ...
```

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MusicPlayer.git
   cd MusicPlayer
   ```

2. Install dependencies (optional, for local server):
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm start
   ```
   Or simply open `index.html` in your browser.

### Adding Your Music

1. Create a new folder in the `Songs/` directory (e.g., `myplaylist/`)
2. Add your music files (`.mp3`, `.wav`, etc.)
3. Create `info.json`:
   ```json
   {
     "title": "My Playlist",
     "description": "Description of your playlist"
   }
   ```
4. Create `songs.json`:
   ```json
   {
     "songs": [
       "song1.mp3",
       "song2.mp3",
       "song3.mp3"
     ]
   }
   ```
5. Add `cover.jpg` for the playlist thumbnail

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source as "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at `https://yourusername.github.io/MusicPlayer/`

### Other Hosting Services

This is a static website that can be deployed to any static hosting service:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront
- Any web server

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons from various sources
- Spotify-inspired design
- Modern web standards and best practices

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for music lovers