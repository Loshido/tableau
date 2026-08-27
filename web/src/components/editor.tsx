import { onSettled } from "solid-js"
import {
  StarterKit, UniqueID, Placeholder,
	BlockColor, ListIndent, NotionColorPicker,
	TextStyle, TextColor, Highlight
} from '@domternal/core';
import {
  BlockHandle, BlockContextMenu, SlashCommand,
  SmartPaste, KeyboardReorder,
  FloatingMenu,
} from '@domternal/extension-block-controls';
import '@domternal/theme';
import { BubbleMenu } from "@domternal/core";
import { DomternalBubbleMenu, DomternalEditor, DomternalFloatingMenu, DomternalNotionColorPicker } from "@domternal/vanilla";
import { CodeBlockLowlight } from "@domternal/extension-code-block-lowlight";
import { Image } from '@domternal/extension-image';
import { common, createLowlight } from "lowlight";

const STYLE = `
#editor .ProseMirror ul { list-style: square; }
#editor .ProseMirror ol { list-style: decimal; }
#editor.dm-editor.dm-notion-mode .ProseMirror h1 {
	font-size: 2rem;
	font-weight: 900;
	fonf-family: var(--font-display);
}
#editor.dm-editor.dm-notion-mode .ProseMirror h2 {
	font-size: 1.5rem;
	font-weight: 800;
	fonf-family: var(--font-display);
}
#editor.dm-editor.dm-notion-mode .ProseMirror h3 {
	font-size: 1.25rem;
	font-weight: 700;
	fonf-family: var(--font-display);
}
:root #editor {
	--dm-notion-column-width: max(90%, 44rem);
	--dm-bg: var(--color-papier);
    --dm-text: var(--color-ink);
}`

const STYLE_COLOR_TEMPLATE = `
.dm-block-color-swatch--text[data-color=$KEY]::before {color: var(--dm-block-text-$KEY);}
.dm-block-color-swatch--bg[data-color=$KEY]::before {background: var(--dm-block-bg-$KEY);}
.dm-ncp-swatch--text[data-color=$KEY]::before { color: var(--dm-block-text-$KEY);}
.dm-ncp-swatch--bg[data-color=$KEY] { background-color: var(--dm-block-bg-$KEY);}
[data-text-color=$KEY] { color: var(--dm-block-text-$KEY);}
[data-bg-color=$KEY] { background-color: var(--dm-block-bg-$KEY); }
:root #editor { --dm-block-bg-$KEY: $VALUE; --dm-block-text-$KEY: $VALUE;}`
const COULEURS = {
	'orange': 'var(--color-orange)',
	'navy': 'var(--color-navy)',
	'ink': 'var(--color-ink)',
	'lime': 'green',
	'paper': 'var(--color-papier)',
}

export default () => {
	let bubble, floating: HTMLDivElement | undefined
	const style = STYLE + Object.entries(COULEURS).map(([cle, valeur]) =>
		STYLE_COLOR_TEMPLATE.replaceAll('$KEY', cle).replaceAll('$VALUE', valeur))

	onSettled(() => {
		const lowlight = createLowlight(common)

		const dm = new DomternalEditor(document.getElementById('editor')!, {
			preset: 'notion',
			extensions: [
				StarterKit.configure({
					codeBlock: false
				}),
				CodeBlockLowlight.configure({ lowlight }),
				BlockHandle.configure({ nested: true }),
				BlockContextMenu.configure({
					turnIntoEnabled: false,
					copyLinkEnabled: false
				}),
				KeyboardReorder,
				SlashCommand,
				SmartPaste,
				FloatingMenu.configure({
					requireExplicitTrigger: true
				}),
				NotionColorPicker.configure({
					palette: Object.keys(COULEURS)
				}),
				BlockColor.configure({
					bgColors: Object.keys(COULEURS),
					textColors: Object.keys(COULEURS)
				}),
			    UniqueID,
				ListIndent,
			    Placeholder.configure({ placeholder: "Entrez '/' pour ajouter un block" }),
				BubbleMenu.configure({
					element: bubble
				}),
				TextStyle, TextColor, Highlight,
				Image.configure({
					inline: true,
					maxFileSize: 5 * 1024 * 1024,
					uploadHandler: async (file) => {
						console.info(file)
						const url = URL.createObjectURL(file)
						return url
					}
				})
		  	],
		  	content: '<h1>Project kickoff</h1><p>Type / to insert your first block.</p>',
		})

		const dmbubble = new DomternalBubbleMenu(bubble!, {
			editor: dm.editor,
			items: ['bold', 'italic', 'underline', 'strike', 'code', '|', 'link']
		});
		const dmfloating = new DomternalFloatingMenu(floating!, { editor: dm.editor })
		const dmcolor = new DomternalNotionColorPicker({ editor: dm.editor })

		return () => {
			dmcolor.destroy()
			dmfloating.destroy()
			dmbubble.destroy()
			dm.destroy()
		}
	})

	return <>
		<style>{style}</style>
		<div ref={floating} class="dm-floating-menu"/>
		<div ref={bubble} class="dm-bubble-menu"/>
		<div id="editor" class="dm-editor"/>
	</>
}
