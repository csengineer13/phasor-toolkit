# Hilton HGV UI Toolkit

The Hilton HGV UI Toolkit is a tool for rapid website development. It provides a set of fully-functional components and structures that can be used to build scalable web pages.

This project requires [node.js](http://nodejs.org). Make sure your have `v0.10` or higher installed before proceeding.

## Local Development Environment

**Start the local development environment:**

```
$ npm start
```

The local development provides the following features:

- Live preview server (using [BrowserSync](http://www.browsersync.io/))
- Dependency management
- CSS Autoprefixing
- Sass compilation
- Browserify bundling
- Image optimization

## Build

**Build for production release:**

```
$ npm run build
```

The toolkit builds both a static documentation site and optimized CSS and JS toolkit files.

The build artifacts output to the `dist` directory. This can be deployed to any static hosting environment - no language runtime or database is required.

