export default class Prompt {
    public static get(conflict: string, pointOfView: string, setting: string) {
        return `Tell me a story in 300 words with these details: Conflict: ${conflict}, Point of View: ${pointOfView}, Setting: ${setting}. Even though it's short, try to bring each story to a resolution or cliffhanger. Only respond with the body of the story with no extraneous notes. Separate paragraphs using a newline character, with a backslash and n.`;
    }
}