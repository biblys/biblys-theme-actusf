var ActuSF = {};

/* HOME CAROUSEL */

ActuSF.Carousel = function (element) {
  this.element = element;
  this.prevButton = document.querySelector('.prev-button');
  this.nextButton = document.querySelector('.next-button');

  this.postIndex = -1;
  this.timer = null;
  this.pages = [];

  this.pagination = false;

  this.init();
};

ActuSF.Carousel.prototype = {
  init: function() {
    this.posts = this.element.querySelectorAll('.carousel-post');

    // Display next/previous post on button click
    this.prevButton.addEventListener('click', this.displayPreviousPost.bind(this));
    this.nextButton.addEventListener('click', this.displayNextPost.bind(this));

    // Start/stop autoplay on mouse over/leave
    this.element.addEventListener('mouseover', this.stopAutoplay.bind(this));
    this.element.addEventListener('mouseleave', this.startAutoplay.bind(this));

    this.displayNextPost();
    this.startAutoplay();
  },

  changePost: function(direction) {
    // Hide current post if any
    if (this.currentPost) {
      this.currentPost.style.display = 'none';
    }

    this.postIndex = this.postIndex + direction;

    if (this.postIndex >= this.posts.length) {
      this.postIndex = 0;
    }

    if (this.postIndex < 0) {
      this.postIndex = this.posts.length - 1;
    }

    // Define new current post and display it
    this.currentPost = this.posts[this.postIndex];
    this.currentPost.style.display = 'block';

    // Update pagination
    this.setActivePage(this.postIndex);
  },

  displayNextPost: function() {
    this.changePost(1);
  },

  displayPreviousPost: function() {
    this.changePost(-1);
  },

  startAutoplay: function() {
    if (this.timer) {
      return;
    }

    this.timer = window.setInterval(
      function() {
        this.changePost(1);
      }.bind(this),
      5000
    );
  },

  stopAutoplay: function() {
    if (!this.timer) {
      return;
    }

    window.clearInterval(this.timer);
    this.timer = null;
  },

  createPagination: function() {
    if (!this.pagination) {
      return;
    }

    var pagination = document.createElement('div');
    pagination.classList.add('carousel-pagination');

    var page;
    for (var i = 0, c = this.posts.length; i < c; i++) {
      page = document.createElement('span');
      page.classList.add('carousel-page');
      pagination.appendChild(page);
      this.pages.push(page);
    }

    this.element.appendChild(pagination);
  },

  setActivePage: function(page) {

    if (!this.pagination) {
      return;
    }

    var activePage = this.element.querySelector('.carousel-page.active'),
      newPage = this.element.querySelectorAll('.carousel-page')[page];

    if (activePage) {
      activePage.classList.remove('active');
    }

    newPage.classList.add('active');
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var carousel = document.querySelector('#home-carousel');
  if (carousel) {
    ActuSF.carousel = new ActuSF.Carousel(carousel);
  }
});
