'use strict';
import InfiniteScroll from './infinite-scroll';

let liSize = 30;

const infiniteScroll = new InfiniteScroll(loadMore);

function view() {
  const ul = document.createElement('ul');
  let elements = Array.from(Array(liSize).keys());
  elements = elements.map(e => createLi(e));
  elements.forEach(e => ul.appendChild(e));

  const divScroll = document.getElementById('scrollDiv');
  divScroll.innerHTML = '';
  divScroll.appendChild(ul);
  infiniteScroll.subscribe();
}

function loadMore() {
  console.log('load more');
  liSize += 21;
  view();
}

function createLi(content) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  div.innerHTML = content;
  li.appendChild(div);
  return li;
}

document.addEventListener('DOMContentLoaded', () => view());

