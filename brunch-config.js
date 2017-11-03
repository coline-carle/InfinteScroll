module.exports = {
  paths: {
    public: 'dev',
    watched: ['src']
  },
  files: {
    javascripts: {
      joinTo: {
        'js/infinite-scroll.js': /^src/,
        'js/vendor.js': /^(?!src)/
      }
    }
  },

  plugins: {
    babel: {
      plugins: ['lodash'],
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
