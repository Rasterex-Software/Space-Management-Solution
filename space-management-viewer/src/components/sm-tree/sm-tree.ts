import {
    property, html, svg, TemplateResult,
    LitElement
} from 'lit-element';

import { treeStyles } from './sm-tree-styles';

export interface TreeNodeData  {
    name: string,
    icon?: string,
    isOpen?: boolean,
    isEditing?: boolean,
    isSelected?: boolean,
    level?: number,
    children?: TreeNodeData[],
    fileData?: any

}
export class SmTree extends LitElement {
    // internal properties

    private svgSpritePath = '/assets/feather-sprite.svg#'
    public selectedNodeEl:Element;

    // observed properties

    @property({ type: Object })
    public data: TreeNodeData;

    @property({ type: String, reflect: true })
    public uploadInputId = "fileToUpload";

    protected editedNodeDataRef: TreeNodeData;

    protected msgNodeIsNotSelectable = 'Only nodes with files atached are selectable. ( Nodes that have a "full" fileicon )';

    protected msgRemoveNode = 'Are you sure you want to remove the node?';
    protected msgOverwriteFileAssignedToNode = 'The node already has an assigned file. Do you wish to overwrite it?';


    static get styles() {
        return treeStyles;
    }


    protected render() {
        return html`
            <div>
                ${this.renderNode(this.data)}
            </div>
        `
    }

    protected renderNode(nodeData:any, level:number = 0) {
        if (!nodeData.isEditing) {
            nodeData.isEditing = false;
        }

        nodeData.level = level;

        if(typeof nodeData.children ==='undefined') {
            nodeData.children = [];
        }

        return nodeData
            ? html`
                <div class="node-container ${nodeData.isSelected?`selected`:``}" .nodeData=${nodeData}>
                    <div class="node-row">
                        <span
                            class="${this.computeOpenCloseClass(nodeData)}"
                            @click=${this.toggleChildren}
                        ></span>

                        ${false?nodeData.level:``}
                        <div class="node-name-wrap" @click=${this.selectNode}>
                            ${this.computeIcon(nodeData.icon)}
                            ${this.renderFileIcon(nodeData)}
                            <span ?hidden=${nodeData.isEditing} class="node-name">${nodeData.name}</span>
                        </div>
                        <input ?hidden=${!nodeData.isEditing}
                            type="text"
                            class="new-node-name"
                            .value=${nodeData.name}
                            @keyup=${this.shortcutListener}>
                        ${nodeData.isEditing?html`
                            ${this.renderActionIcon('check', this.saveNodeChanges, 'Save changes')}
                            ${this.renderActionIcon('x',this.cancelNodeChanges, 'Cancel')}
                        `:html`
                            <div class="node-actions">
                                ${this.renderActionIcon('plus-square',this.addNode,'Add child node')}
                                ${nodeData.level>=4?this.renderActionIcon('upload',this.uploadFile, 'Upload a file for this node'):''}
                                ${this.renderActionIcon('edit-3',this.editNode, 'Edit node name')}
                                ${nodeData.level>0?this.renderActionIcon('trash-2', this.removeNode, 'Remove this node'):''}
                            </div>
                        `}
                    </div>
                    ${nodeData.isOpen
                    ? html`
                        <ul>
                            ${nodeData.children.map((childNodeData:any) => this.renderNode(childNodeData, (nodeData.level + 1) )) }
                        </ul>
                        `
                    : ''
                }
                </div>
            `
            : html``;
    }


    public selectNode(e: CustomEvent) {
        const treeNode = this.getTreeNodeFromEvent(e);
        const treeNodeData = this.getTreeNodeDataFromEvent(e);

        // if (!this.isNodeSelectable(treeNodeData)){
        //     alert(this.msgNodeIsNotSelectable);
        //     return;
        // }

        if (this.selectedNodeEl && treeNode !== this.selectedNodeEl) {
            this.deselectNode(this.selectedNodeEl);
            // if ((this.selectedNodeEl as any).nodeData) {
            //     (this.selectedNodeEl as any).nodeData.isSelected = false;
            // }
        }
        this.selectedNodeEl = treeNode;
        treeNodeData.isSelected = true;
        console.log('select', e);
        const selectEvent = new CustomEvent('select', { bubbles: true, composed: true, detail: treeNode });
        this.dispatchEvent(selectEvent);

        this.requestUpdate();
    }

    public deselectNode(node: Element) {
        // this.querySelectorAll('.selected').forEach((el)=>{
        //     el.classList.remove('selected');
        //     if ((el as any).nodeData) {
        //         (el as any).nodeData.isEditing = false;
        //         (el as any).nodeData.isSelected = false;
        //     }
        // });
        if (node !== null) {
            // if (node.classList && node.classList.contains('selected')) {
            //     node.classList.remove('selected');
            // }
            if (node.hasOwnProperty('nodeData')) {
                (node as any).nodeData.isEditing = false;
                (node as any).nodeData.isSelected = false;
            }
            // node.classList.add('selected');
        }
    }


    // public isNodeSelectable(treeNodeData:TreeNodeData):boolean{
    //     let isSelectable = false;
    //     if (treeNodeData && treeNodeData.fileData && treeNodeData.fileData.name) {
    //         isSelectable = true;
    //     }

    //     return isSelectable;
    // }

    public editNode(e:any) {
        const treeNodeData = this.getTreeNodeDataFromEvent(e);
        if (this.editedNodeDataRef) {
            this.editedNodeDataRef.isEditing = false;
        }
        treeNodeData.isEditing = true;

        this.editedNodeDataRef = treeNodeData;
        console.log('edit',e);
        this.requestUpdate();
    }

    public addNode(e:any) {
        // const treeNode = this.getTreeNodeFromEvent(e);
        const treeNodeData = this.getTreeNodeDataFromEvent(e);
        console.log('add',e);
        if (treeNodeData) {
            const newNode:TreeNodeData = {
                name: 'New Node ' + (treeNodeData.children?treeNodeData.children.length:0),
                level: treeNodeData.level+1,
                // icon?: string,
                isOpen: true,
                isEditing: true,
                isSelected: false,
                children: []
            };
            treeNodeData.isOpen = true;
            if (this.editedNodeDataRef) {
                this.editedNodeDataRef.isEditing = false;
            }
            this.editedNodeDataRef = newNode;
            // treeNodeData.children.push(newNode);
            treeNodeData.children.unshift(newNode);
        }
        this.requestUpdate();
    }

    public removeNode(e:any) {

        const okToRemove= confirm(this.msgRemoveNode);
        if (!okToRemove) {
            return;
        }
        // TODO review/refactor
        const treeNode = this.getTreeNodeFromEvent(e);
        let treeNodeData = this.getTreeNodeDataFromEvent(e);
        let parentNode = null;
        if (treeNode && treeNode.parentElement) {
            parentNode = treeNode.parentElement.closest('.node-container');
        }
        if ( parentNode && parentNode.nodeData) {
            parentNode.nodeData.children = parentNode.nodeData.children.concat().filter((v:any)=>v!==treeNodeData);
            // parentNode.nodeData.isSelected = true;
            // TODO check if the node is the tree bhranch being deleted
            if (this.selectedNodeEl) {
                this.deselectNode(this.selectedNodeEl);
            }
        }
        console.log('remove',e);
        this.requestUpdate();
    }

    public uploadFile(e:any) {

        const treeNode = this.getTreeNodeFromEvent(e);
        let treeNodeData = this.getTreeNodeDataFromEvent(e);
        let parentNode = null;
        if (treeNode && treeNode.parentElement) {
            parentNode = treeNode.parentElement.closest('.node-container');
        }
        if ( parentNode && parentNode.nodeData) {
            if (this.selectedNodeEl && this.selectedNodeEl!==treeNode) {
                this.deselectNode(this.selectedNodeEl);
                this.selectedNodeEl = treeNode;
                treeNodeData.isSelected = true;
                console.log('select', e);
                const selectEvent = new CustomEvent('select', { bubbles: true, composed: true, detail: treeNode });
                this.dispatchEvent(selectEvent);
            }
        }

        if (treeNodeData && treeNodeData.fileData
            && treeNodeData.fileData.name
            && treeNodeData.fileData.name.length){
                const okToUpload = confirm(this.msgOverwriteFileAssignedToNode);
                if (!okToUpload) {
                    return;
                }
        }

        console.log('upload',e);
        // TODO review this
        const uploadElement = document.getElementById(this.uploadInputId);
        if (uploadElement) {
            (uploadElement as any).click();
        } else {
            console.log(`Error. There is no HTML input file element with the id ${this.uploadInputId}`);
        }

        this.requestUpdate();
    }

    // this is called when the save button 'tick' is cliked and also from the shortcutListener method
    public saveNodeChanges(e:any) {
        const treeNode = this.getTreeNodeFromEvent(e);
        const treeNodeData = this.getTreeNodeDataFromEvent(e);
        console.log('save',e);
        const inputEl = treeNode.querySelector('.new-node-name');

        if (inputEl && inputEl.value) {
            treeNodeData.name = inputEl.value;
        }
        treeNodeData.isEditing = false;
        this.requestUpdate();
    }

    public cancelNodeChanges(e:any) {
        const treeNodeData = this.getTreeNodeDataFromEvent(e);
        console.log('cancel',e);
        treeNodeData.isEditing = false;
        this.requestUpdate();
    }

    public getHierarchyPathStringForNodeElement(nodeElement:Element, separator:string=' / ') {
        let pathString='';
        let n:any = nodeElement;
        while ( n && (n as any).nodeData && (n as any).nodeData.name ){
            if (pathString!=='') {
                pathString = separator + pathString;
            }
            pathString = (n as any).nodeData.name + pathString;
            n = n.parentElement.closest('.node-container');
        }

        return pathString;
    }

    public getHierarchyPathStringForSelectedNode(separator:string=' / ') {
        return this.getHierarchyPathStringForNodeElement(this.selectedNodeEl, separator);
    }


    private computeOpenCloseClass(nodeData:any): string {
        const isOpen = nodeData && nodeData.isOpen;
        const children = nodeData && nodeData.children;
        return 'node-preicon ' + ((isOpen && children && children.length) ? 'expanded' : children && children.length ? 'collapsed' : '');
    }


    private computeIcon(icon: string): TemplateResult {
        return icon
            ? html`
                <span class="node-icon">
                    ${svg`<svg class="icon">
                        <use href="${this.svgSpritePath + icon}"></use>
                    </svg>`}
                </span>
                `
            : html``;
    }

    private renderFileIcon(nodeData: TreeNodeData): TemplateResult {
        let tplResult:TemplateResult = html``;
        if (nodeData && nodeData.fileData && nodeData.fileData.name) {
            tplResult = this.computeIcon('file-text');
        }else {
            tplResult = this.computeIcon('file');
        }
        return tplResult;
    }

    private renderActionIcon(icon: string, action:any, title:string=''): TemplateResult{
        return icon
            ? html`
                <span class="node-action-icon" @click=${action} title="${title}">
                    ${svg`<svg class="icon">
                        <use href="${this.svgSpritePath + icon}"></use>
                    </svg>`}
                </span>
                `
            : html``;
    }

    private toggleChildren(e:Event){ // nodeData:any) {
        const nodeData = this.getTreeNodeDataFromEvent(e);
        if (!nodeData) {
            return;
        }
        console.log('toggle', nodeData);
        nodeData.isOpen = !nodeData.isOpen && nodeData.children && nodeData.children.length;
        this.requestUpdate();

        const toggleEvent = new CustomEvent('toggle', { bubbles: true, composed: true, detail: this });
        this.dispatchEvent(toggleEvent);
    }

    private getTreeNodeDataFromEvent(e:any): any{
        const treeNode =  this.getTreeNodeFromEvent(e);
        try {
            const nodeData = (treeNode as any).nodeData;
            return nodeData;
        } catch (e) {
            return;
        }
    }

    private getTreeNodeFromEvent(e:any): any{
        const treeNode = e.target && e.target.closest('.node-container');
        return treeNode;
    }

    protected shortcutListener(e:any) {
        // console.log('shortcut listener',e);
        if (e.key==='Enter') {
            this.saveNodeChanges(e);
        }
    }
}

window.customElements.define('sm-tree', SmTree);