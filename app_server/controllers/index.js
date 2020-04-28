const axios = require('axios');

const apiOptions = {
  server: `http://localhost:${process.env.PORT}`
}

module.exports.index = (req, res, next) => {
  // Get 5 or less lates blog posts
  let path = '/api/blog?amount=5';

  axios.get(apiOptions.server + path)
    .then(response => {
      // Prettify the posts
      let posts = response.data;
      posts = posts.map(post => {
        post.date = formatDate(post.date);
        return post;
      });

      // Display index page with recent posts
      res.render('index', {
        title: 'm3tro1d\'s homepage',
        page_name: 'm3tro1d.',
        recent_posts: posts
      });
    })
    .catch(error => {
      // Render, but don't display recent posts
      res.render('index', {
        title: 'm3tro1d\'s homepage',
        page_name: 'm3tro1d.',
        err_status: 1
      });
    });
}

module.exports.software = (req, res, next) => {
  res.render('software', {
    title: 'Software',
    page_name: 'my software.'
  });
}

module.exports.scripts = (req, res, next) => {
  res.render('scripts', {
    title: 'Scripts',
    page_name: 'my batch scripts.'
  });
}


// Useful functions
// Formats a date in a pretty string
function formatDate(dateString) {
  let monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ];

  let date = new Date(dateString);

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}