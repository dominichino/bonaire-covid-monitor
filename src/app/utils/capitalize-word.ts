// Capitalize 1 word
export function capitalizeWord(word: string = '') {
    if (word.length > 1) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    } else if (word.length === 1) {
        return word[0].toUpperCase();
    }

    return word;
}
