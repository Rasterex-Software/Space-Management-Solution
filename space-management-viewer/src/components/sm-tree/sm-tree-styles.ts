import {
    css
} from 'lit-element';

export const treeStyles = [
           css`
               .node-container.selected > .node-row {
                   background-color: var(--rasterex-tree-view-selected-background-color, rgba(200, 200, 200, 0.5));
                   color: var(--rasterex-tree-view-selected-color, inherit);
               }

               .node-container {
                   white-space: nowrap;
                   border-left: 1px dashed #333;
               }

               .node-row {
                   padding-left: 4px;
                   padding-right: 4px;
                   user-select: none;
               }
               .node-actions {
                   display: none;
               }
               .node-row:hover .node-actions {
                    display: inline-block;
               }
               .node-name-wrap {
                   display: inline-block;
                   vertical-align: middle;
               }
               .node-name {
                   vertical-align: middle;
                   user-select: none;
               }
               .node-preicon.collapsed,
               .node-preicon.expanded {
                   padding-left: 0px;
               }

               .node-preicon {
                   padding-left: 18px;
               }

               .node-preicon:before {
                   margin-right: 5px;
               }

               .node-preicon.collapsed:before {
                   content: '\\002B';
               }

               .node-preicon.expanded:before {
                   content: '\\2212';
               }

               .node-preicon, .node-name {
                   cursor: pointer;
               }

               .node-icon,
               .node-action-icon {
                   cursor: pointer;
                   display: inline-flex;
                   align-items: center;
                   position: relative;
                   vertical-align: middle;
                   width: var(--rasterex-tree-view-icon-size, 24px);
                   height: var(--rasterex-tree-view-icon-size, 24px);
               }
               .node-action-icon {
                    width: var(--rasterex-tree-view-action-icon-size, 20px);
                    height: var(--rasterex-tree-view-action-icon-size, 20px);
                }

               .node-icon svg,
               .node-action-icon svg {
                   fill: var(--rasterex-tree-action-icon-fill, #ffffff);
                   stroke: var(--rasterex-tree-action-icon-stroke, currentcolor);
                   width: var(--rasterex-tree-view-action-icon-size, 20px);
                   height: var(--rasterex-tree-view-action-icon-size, 20px);
               }

               .node-container.selected > .node-row .node-icon svg,
               .node-container.selected > .node-row .node-action-icon svg {
                    fill: var(--rasterex-tree-view-selected-background-color, rgba(200, 200, 200, 0.5));
               }

               .node-action-icon:hover svg {
                    stroke-width: var(--rasterex-tree-view-action-icon-stroke-width, 3);
               }
               ul {
                   margin: 0;
                   padding-left: 20px;
               }

               li {
                   list-style-type: none;
               }

               [hidden] {
                   display: none;
               }

               .new-node-name {
                   font-size: inherit;
                   font: inherit;
                   padding: 3px;
               }
           `
       ];


