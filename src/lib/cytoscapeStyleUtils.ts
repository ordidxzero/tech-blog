import {
  dimColor,
  nodeActiveColor,
  nodeColor,
  edgeColor,
  edgeWidth,
  arrowScale,
  successorColor,
  predecessorsColor,
  nodeActiveSize,
  fontActiveSize,
  nodeMaxSize,
  nodeMinSize,
  fontMinSize,
  fontMaxSize,
  edgeActiveWidth,
} from '../constants/cytoscape.constant';

type Collection = cytoscape.CollectionReturnValue;
type SingularElement = cytoscape.SingularElementReturnValue;
type Core = cytoscape.Core;

// Reset the style of all elements.
// need boolean
const defaultStyle = {
  node: (rank: number, isDarkMode: boolean) => ({
    'background-color': nodeColor,
    color: isDarkMode ? '#D6D3D1' : nodeColor,
    width: nodeMaxSize * rank + nodeMinSize,
    height: nodeMaxSize * rank + nodeMinSize,
    'font-size': fontMaxSize * rank + fontMinSize,
    opacity: 1,
  }),
  edge: {
    'line-color': edgeColor,
    'source-arrow-color': edgeColor,
    width: edgeWidth,
    'arrow-scale': arrowScale,
    opacity: 1,
  },
};

export const setDefaultStyle = (instance: Core, isDarkMode: boolean) => {
  const pageRank = instance.elements().pageRank({});
  instance.nodes().forEach(target => {
    const rank = pageRank.rank(target);
    target.style(defaultStyle.node(rank, isDarkMode));
  });
  instance.edges().forEach(target => {
    target.style(defaultStyle.edge);
  });
};

// When the elements are selected or filtered, Apply the dimStyle to all elements
const dimStyle = (isDarkMode: boolean) => ({
  'background-color': dimColor,
  'line-color': dimColor,
  'source-arrow-color': dimColor,
  color: isDarkMode ? '#D6D3D1' : dimColor,
});

export const setDimStyle = (instance: Core, isDarkMode: boolean) => {
  instance.elements().forEach(target => {
    target.style(dimStyle(isDarkMode));
  });
};

// Set Opacity dynamically
function setElementOpacity(element: SingularElement, degree: number) {
  element.style('opacity', degree);
}

// When the elements are focused, Apply the focusedStyle to the focused element and around elements
// need boolean
const focusedStyle = (isDarkMode: boolean) => ({
  element: (focusedElement: SingularElement) => ({
    'background-color': nodeActiveColor,
    color: isDarkMode ? '#D6D3D1' : nodeColor,
    width: Math.max(parseFloat(focusedElement.style('width')), nodeActiveSize),
    height: Math.max(parseFloat(focusedElement.style('height')), nodeActiveSize),
    'font-size': Math.max(parseFloat(focusedElement.style('font-size')), fontActiveSize),
    opacity: 1,
  }),
  successor: {
    node: {
      color: isDarkMode ? '#D6D3D1' : nodeColor,
      'background-color': successorColor,
      'line-color': successorColor,
      'source-arrow-color': successorColor,
    },
    edge: {
      width: edgeActiveWidth,
      'arrow-scale': arrowScale,
    },
  },
  predecessor: {
    node: {
      color: isDarkMode ? '#D6D3D1' : nodeColor,
      'background-color': predecessorsColor,
      'line-color': predecessorsColor,
      'source-arrow-color': predecessorsColor,
    },
    edge: {
      width: edgeActiveWidth,
      'arrow-scale': arrowScale,
    },
  },
});

export const setFocusedStyle = (focusedElement: SingularElement, isDarkMode: boolean) => {
  // Focused Element Style
  focusedElement.style(focusedStyle(isDarkMode).element(focusedElement));

  // Parent Node and Edge Style
  focusedElement.successors().each(element => {
    if (element.isEdge()) {
      element.style(focusedStyle(isDarkMode).successor.edge);
    }
    element.style(focusedStyle(isDarkMode).successor.node);
    setElementOpacity(element, 0.5);
  });

  // Child Node and Edge Style
  focusedElement.predecessors().each(element => {
    if (element.isEdge()) {
      element.style(focusedStyle(isDarkMode).predecessor.edge);
    }
    element.style(focusedStyle(isDarkMode).predecessor.node);
    setElementOpacity(element, 0.5);
  });

  // Neighbor Node and Edge Style
  focusedElement.neighborhood().each(element => {
    setElementOpacity(element, 1);
  });
};

// When the elements are filtered, Apply the filteredStyle to the filtered elements
const filteredStyle = (element: SingularElement) => ({
  'background-color': nodeActiveColor,
  color: nodeColor,
  width: Math.max(parseFloat(element.style('width')), nodeActiveSize),
  height: Math.max(parseFloat(element.style('height')), nodeActiveSize),
  'font-size': Math.max(parseFloat(element.style('font-size')), fontActiveSize),
  opacity: 1,
});

export const setFilteredStyle = (filteredElements: Collection) => {
  filteredElements.forEach(target => {
    target.style(filteredStyle(target));
  });
};
