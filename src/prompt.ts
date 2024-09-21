import FacetDefinition from "./facet-definition";

export default class Prompt {
    public static get(facetDefinition: FacetDefinition): string {
        return `Tell me a story in 300 words with these details: Conflict: ${facetDefinition.conflict}, Point of View: ${facetDefinition.pointOfView}, Setting: ${facetDefinition.setting}. Even though it's short, try to bring each story to a resolution or cliffhanger. Only respond with the body of the story with no extraneous notes. Separate paragraphs using a newline character, with a backslash and n.`;
    }
}