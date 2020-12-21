/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import './src/styles/global.css';
import { ContextProvider } from './src/lib/context';

export const wrapRootElement = ({ element }) => <ContextProvider>{element}</ContextProvider>;
