
// 3. Please refactor the code below to make it more concise, efficient and readable with good logic flow.

function findFirstStringInBracket(str) {
    if (str.length > 0) {
        let indexFirstBracketFound = str.indexOf("(");
        // console.log('indexFirstBracketFound : ', indexFirstBracketFound)

        if (indexFirstBracketFound >= 0) {
            let wordsAfterFirstBracket = str.substr(indexFirstBracketFound);
            // console.log('wordsAfterFirstBracket : ', wordsAfterFirstBracket)
            if (wordsAfterFirstBracket) {
                wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);
                let indexClosingBracketFound = wordsAfterFirstBracket.indexOf(")");
                if (indexClosingBracketFound >= 0) {
                    return wordsAfterFirstBracket.substring(0,
                        indexClosingBracketFound);

                }
                else {
                    return '';
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    } else {
        return '';
    }
}

// ANSWER 

function refactor(str) {
    try {
        const firstIndex = str.indexOf("(") + 1;
        const lastIndex = str.indexOf(")");
        return str.substring(firstIndex, lastIndex)
    } catch {
        // just return empty string if params is not qualified :
        // - parameter is string
        // - parameter contains character "(" and ")"
        return '';

    }

}
