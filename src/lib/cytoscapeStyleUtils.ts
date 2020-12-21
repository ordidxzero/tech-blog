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
const defaultStyle = {
  node: (rank: number) => ({
    'background-color': nodeColor,
    color: nodeColor,
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

export const setDefaultStyle = (instance: Core) => {
  const pageRank = instance.elements().pageRank({});
  instance.nodes().forEach(target => {
    const rank = pageRank.rank(target);
    target.style(defaultStyle.node(rank));
  });
  instance.edges().forEach(target => {
    target.style(defaultStyle.edge);
  });
};

// When the elements are selected or filtered, Apply the dimStyle to all elements
const dimStyle = {
  'background-color': dimColor,
  'line-color': dimColor,
  'source-arrow-color': dimColor,
  color: dimColor,
};

export const setDimStyle = (instance: Core) => {
  instance.elements().forEach(target => {
    target.style(dimStyle);
  });
};

// Set Opacity dynamically
function setElementOpacity(element: SingularElement, degree: number) {
  element.style('opacity', degree);
}

// When the elements are focused, Apply the focusedStyle to the focused element and around elements
const focusedStyle = {
  element: (focusedElement: SingularElement) => ({
    'background-color': nodeActiveColor,
    color: nodeColor,
    width: Math.max(parseFloat(focusedElement.style('width')), nodeActiveSize),
    height: Math.max(parseFloat(focusedElement.style('height')), nodeActiveSize),
    'font-size': Math.max(parseFloat(focusedElement.style('font-size')), fontActiveSize),
    opacity: 1,
  }),
  successor: {
    node: {
      color: nodeColor,
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
      color: nodeColor,
      'background-color': predecessorsColor,
      'line-color': predecessorsColor,
      'source-arrow-color': predecessorsColor,
    },
    edge: {
      width: edgeActiveWidth,
      'arrow-scale': arrowScale,
    },
  },
};

export const setFocusedStyle = (focusedElement: SingularElement) => {
  // Focused Element Style
  focusedElement.style(focusedStyle.element(focusedElement));

  // Parent Node and Edge Style
  focusedElement.successors().each(element => {
    if (element.isEdge()) {
      element.style(focusedStyle.successor.edge);
    }
    element.style(focusedStyle.successor.node);
    setElementOpacity(element, 0.5);
  });

  // Child Node and Edge Style
  focusedElement.predecessors().each(element => {
    if (element.isEdge()) {
      element.style(focusedStyle.predecessor.edge);
    }
    element.style(focusedStyle.predecessor.node);
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
