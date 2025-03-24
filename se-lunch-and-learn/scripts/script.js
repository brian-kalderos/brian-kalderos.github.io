const links = [
  { view: 'team', page: 'team.html', icon: 'bi-people' },
  { view: 'fullstack', page: 'fullstack.html', icon: 'bi-layers' },
  { view: 'tech', page: 'tech.html', icon: 'bi-cpu' },
  { view: 'sdlc', page: 'sdlc.html', icon: 'bi-arrow-repeat' },
  { view: 'apps', page: 'apps.html', icon: 'bi-window-sidebar' },
  { view: 'integrations', page: 'integrations.html', icon: 'bi-database' },
  { view: 'design', page: 'design.html', icon: 'bi-palette' },
  { view: 'security', page: 'security.html', icon: 'bi-shield-lock' },
  { view: 'testing', page: 'testing.html', icon: 'bi-bug' }
];

function renderFooter() {

  var page = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

  var footer = document.createElement('div');
  footer.classList.add('footer-bar');

  var home = document.createElement('a');
  home.classList.add('footer-icon');
  home.href = 'launcher.html';
  home.innerHTML += `<i class="bi-grid-3x3-gap"></i>`;
  footer.appendChild(home);

  var divider = document.createElement('div');
  divider.classList.add('footer-divider');
  footer.appendChild(divider);

  links.forEach(link => {
    var icon = document.createElement('a');
    icon.classList.add('footer-icon');
    icon.style.viewTransitionName = link.view;
    icon.href = link.page;
    icon.innerHTML += `<i class="${link.icon}"></i>`;

    if (link.page === page) {
      icon.classList.add('active');
    }

    footer.appendChild(icon);
  });

  var footerRoot = document.createElement('div')
  footerRoot.classList.add('footer-root');
  footerRoot.appendChild(footer);

  var bodyRoot = document.getElementsByClassName('body-root')[0];
  bodyRoot.appendChild(footerRoot);
}

window.addEventListener('pagereveal', async (e) => {
  if (e.viewTransition) {

    const from = navigation.activation.from.url.substring(navigation.activation.from.url.lastIndexOf('/') + 1);
    const to = navigation.activation.entry.url.substring(navigation.activation.entry.url.lastIndexOf('/') + 1);

    if (from === 'launcher.html') {
      e.viewTransition.types.add('down');
    } else if (to === 'launcher.html') {
      e.viewTransition.types.add('up');
    } else {
      var iFrom = links.indexOf(links.find(x => x.page == from));
      var iTo = links.indexOf(links.find(x => x.page == to));

      if (iTo !== undefined && iFrom !== undefined && iTo !== iFrom) {
        e.viewTransition.types.add(iTo > iFrom ? 'forward' : 'backward');
      }
    }
  }
});