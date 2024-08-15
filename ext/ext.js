import {app,api} from '../../../scripts/app.js'
import {$el} from '../../../scripts/ui.js'

app.registerExtension({ 
	name: "sd-cpm",
	async setup() { 
		alert("Setup complete!")
	},
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeType?.ComfyClass=="cpm") { 
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function (side,slot,connect,link_info,output) {     
                const r = onNodeCreated?.apply(this, arguments);   
                console.log("Node Created!");
                return r;
            }
        }
    }
})