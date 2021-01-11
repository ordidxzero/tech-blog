import { useRef, useEffect, useCallback } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { navigate } from 'gatsby';
import { nodeColor, nodeMaxSize, nodeMinSize, fontMinSize, fontMaxSize } from '../constants/cytoscape.constant';
import { setDimStyle, setFocusedStyle, setDefaultStyle, setFilteredStyle } from '../lib/cytoscapeStyleUtils';
import { useContextState } from '../lib/context';
import generateCytoscapeData from '../lib/cytoscapeDataUtils';
import useMarkdownData from './useMarkdownData';

// cose blikent Layout을 사용하기 위해 layout을 cytoscape에 등록함
cytoscape.use(coseBilkent);

// Cytoscape Node Style
const nodeStyle: cytoscape.Stylesheet = {
  selector: 'node',
  style: {
    'background-color': nodeColor,
    label: 'data(label)',
  },
};

// Cytoscape Edge Style
const edgeStyle: cytoscape.Stylesheet = {
  selector: 'edge',
  style: {
    width: 3,
    'curve-style': 'bezier',
    'line-color': '#ccc',
    'source-arrow-color': '#ccc',
    'source-arrow-shape': 'vee',
  },
};

// 아래 링크에서 레이아웃 선택 가능
// https://js.cytoscape.org/?fbclid=IwAR0Kupml3aIQwPHwLd5NLKvwqyQnVMgGjHTpJU1mk7miYws0UI9JMS-O3T4#extensions/layouts
const cytoscapeLayout = {
  name: 'cose-bilkent',
  animate: false,
  tile: true,
  gravityRangeCompound: 1.2,
};

function useCytoscape() {
  const markdown = useMarkdownData();
  const [isDarkMode] = useContextState('isDarkMode');
  const resizeTimer = useRef(0);
  const instance = useRef<cytoscape.Core>();
  const cytoscapeRef = useRef(null);

  const [filter] = useContextState('filter');
  const [category] = useContextState('category');

  // Window에 resize이벤트가 발생할 때 마다 cytoscape의 위치를 가운데로 조정하는 이벤트 핸들러
  const resizeHandler = useCallback((instance?: cytoscape.Core) => {
    clearTimeout(resizeTimer.current);
    resizeTimer.current = window.setTimeout(() => instance?.center(), 200);
  }, []);

  // node에 mouseover 이벤트가 발생했을 때 실행될 핸들러.
  // filter의 값을 사용하기 때문에 따로 뺄 수 밖에 없다.
  const mouseoverHandler = useCallback(
    (e: cytoscape.EventObject) => {
      if (filter) return;
      if (instance.current) {
        setDimStyle(instance.current, isDarkMode as boolean);
        setFocusedStyle(e.target, isDarkMode as boolean);
      }
    },
    [filter, isDarkMode],
  );

  // node에 mouseout 이벤트가 발생했을 때 실행될 핸들러.
  // filter의 값을 사용하기 때문에 따로 뺄 수 밖에 없다.
  const mouseoutHandler = useCallback(() => {
    if (filter) return;
    if (instance.current) {
      setDefaultStyle(instance.current, isDarkMode as boolean);
    }
  }, [filter, isDarkMode]);

  useEffect(() => {
    // Cytoscape Instance
    // container: cytoscape를 렌더링할 target element
    // elements: cytoscape에서 사용할 데이터
    // Elements는 나중에 useGraphqlData hook을 만들고 가져올 것
    instance.current = cytoscape({
      container: cytoscapeRef.current,
      elements: generateCytoscapeData(markdown.nodes),
      style: [nodeStyle, edgeStyle],
      layout: cytoscapeLayout,
    });

    // Assign Node size based on depth
    const pageRank = instance.current.elements().pageRank({});
    instance.current.nodes().each(element => {
      const rank = pageRank.rank(element);
      element.style({
        width: nodeMaxSize * rank + nodeMinSize,
        height: nodeMaxSize * rank + nodeMinSize,
        'font-size': fontMaxSize * rank + fontMinSize,
      });
    });

    // Cytoscape Configuration
    // Configuration Method Reference : https://js.cytoscape.org/#core/viewport-manipulation
    instance.current.maxZoom(3);
    instance.current.fit();
    instance.current.center();

    // Cytoscape Event Listener
    // Event Type Reference : https://js.cytoscape.org/#events
    instance.current.on('mouseover', 'node', mouseoverHandler);

    // instance.current.on('viewport', () => console.log('move'));

    instance.current.on('mouseout', 'node', mouseoutHandler);

    instance.current.on('click', 'node', e => {
      const path = e.target.data('id');
      navigate(`/${path}`);
    });
    instance.current.on('touchstart', 'node', e => {
      const path = e.target.data('id');
      navigate(`/${path}`);
    });

    // Window Event Listener
    window.addEventListener('resize', () => resizeHandler(instance.current));
    return () => {
      window.removeEventListener('resize', () => resizeHandler(instance.current));
    };
  }, []);

  useEffect(() => {
    if (instance.current) {
      // Category가 적용됐을 때, data를 필터링한다.
      const elements = instance.current.elements().filter(el => el.hidden());
      elements.style('display', 'element');
      if (category !== 'overview') {
        const elements = instance.current.elements().filter(function (node) {
          if (!node.data('category')) return true;
          return !node.data('category').includes(category);
        });
        elements.style('display', 'none');
      }
    }
  }, [category]);

  useEffect(() => {
    if (instance.current) {
      // Filter가 적용됐을 때, filteredElements의 스타일을 정한다.
      setDefaultStyle(instance.current, isDarkMode as boolean);
      if (filter !== null && typeof filter === 'string') {
        const filteredElements = instance.current.filter(function (ele) {
          if (ele.data('tag')) return ele.data('tag').includes(filter.toLowerCase());
          return false;
        });
        setDimStyle(instance.current, isDarkMode as boolean);
        setFilteredStyle(filteredElements, isDarkMode as boolean);
      }

      instance.current.removeListener('mouseover');
      instance.current.removeListener('mouseout');
      instance.current.on('mouseover', 'node', mouseoverHandler);
      instance.current.on('mouseout', 'node', mouseoutHandler);
    }
  }, [filter, isDarkMode]);

  return cytoscapeRef;
}

export default useCytoscape;
