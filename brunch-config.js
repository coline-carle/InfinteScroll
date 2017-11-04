module.exports = {
  paths: {
    public: 'dev',
    watched: ['app']
  },
  files: {
    javascripts: {
      joinTo: {
        'app.js': /^app/,
        'vendor.js': /^(?!app)/
      }
    },
    stylesheets: {
      joinTo: 'app.css'
    }
  },
  server: {
    run: true
  },
  plugins: {
    babel: {
      presets: [['env', {
        targets: {
          browsers: ['last 2 versions']
        }
      }]]
    }
  },
  overrides: {
    production: {
      optimize: true,
      sourceMaps: true,
      paths: {
        public: 'prod',
        watched: ['src']
      }
    }
  }
};
