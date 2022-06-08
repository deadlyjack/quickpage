import './pagination.scss';
import tag from 'html-tag-js';

/**
 *
 * @param {{currentPage: number, totalPages: number}} param0
 * @param {(page: number, limit: number)=>{currentPage: number, totalPages: number}} update
 * @returns {Pagination}
 */
export default function Pagination({ currentPage, totalPages }, limit, update) {
  const $prev = tag('button', {
    className: 'icon keyboard_arrow_left',
    disabled: currentPage === 1,
    onclick() {
      updateState('prev');
    },
  });
  const $next = tag('button', {
    className: 'icon keyboard_arrow_right',
    disabled: currentPage === totalPages,
    onclick() {
      updateState('next');
    },
  });
  const $pageInput = tag('input', {
    className: 'pagination_attribute',
    type: 'number',
    min: 1,
    max: totalPages,
    value: currentPage,
    onchange() {
      updateState('jump');
    },
  });
  const $totalPage = tag('span', {
    className: 'pagination_attribute',
    textContent: totalPages,
  });
  const $limit = tag('input', {
    className: 'pagination_attribute',
    type: 'number',
    min: 1,
    max: 500,
    value: limit,
    onchange() {
      updateState('limit');
    },
  });
  const $pages = tag('div', {
    className: 'pagination__pages',
    children: [
      $pageInput,
      tag('span', {
        textContent: 'of ',
      }),
      $totalPage,
      tag('span', {
        textContent: ' | ',
      }),
      $limit,
      tag('span', {
        textContent: 'per page',
      }),
    ],
  });
  const $pagination = tag('div', {
    className: 'pagination',
    children: [$prev, $pages, $next],
  });

  Object.defineProperties($pagination, {
    currentPage: {
      set(val) {
        $pageInput.value = val;
        updateState('jump');
      },
      get() {
        return +$pageInput.value;
      },
    },
    limit: {
      set(val) {
        $limit.value = val;
        updateState('limit');
      },
      get() {
        return +$limit.value;
      },
    },
    next: {
      value() {
        updateState('next');
      },
    },
    prev: {
      value() {
        updateState('prev');
      },
    },
    reset: {
      value() {
        this.currentPage = 1;
      },
    },
    render: {
      value($el) {
        const resize = () => {
          $el.style.paddingBottom = '50px';
          this.style.width = `${$el.offsetWidth}px`;
          this.style.left = `${$el.offsetLeft}px`;
        };
        this.observer = new ResizeObserver(resize);
        this.observer.observe($el);
        resize();
        $el.append(this);
      },
    },
    destroy: {
      value() {
        this.observer.disconnect();
      },
    },
  });

  return $pagination;

  /**
   *
   * @param {'next' | 'prev' | 'jump' | 'limit'} operation
   */
  async function updateState(operation) {
    switch (operation) {
      case 'next':
        currentPage = ++currentPage > totalPages ? --currentPage : currentPage;
        break;
      case 'prev':
        currentPage = --currentPage < 1 ? ++currentPage : currentPage;
        break;
      case 'jump':
        currentPage = $pageInput.value;
        break;
      case 'limit':
        limit = +$limit.value;
        if (!limit) {
          limit = 100;
          $limit.value = limit;
        }
        break;
      default:
        break;
    }

    let newPagination = update(currentPage - 1, limit);
    if (newPagination instanceof Promise) {
      newPagination = await newPagination;
    }

    ({ currentPage, totalPages } = newPagination);

    $next.disabled = false;
    $prev.disabled = false;

    if (currentPage === totalPages) {
      $next.disabled = true;
    }

    if (currentPage === 1) {
      $prev.disabled = true;
    }

    $pageInput.value = currentPage;
    $totalPage.textContent = totalPages;
  }
}
