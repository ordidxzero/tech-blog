/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import './src/styles/global.css';
import { ContextProvider } from './src/lib/context';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export const wrapRootElement = ({ element }) => <ContextProvider>{element}</ContextProvider>;
