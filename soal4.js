

// interface IStorage { 
//     [key: string]: string[];
//     // key ==> sorted and lowercase word
//     // value ==> list of anagram group
// }

function findAnagram(params) {

    try {
        const storage = new Object() // 1 . declare the storage , see interface IStorage
        for (let index = 0; index < params.length; index++) { // 2. Loop the parameters 
            // 3. manipulate the word to be sorted by alphabets           
            const preparedWord = params[index].split('').sort().join('').toLowerCase();
            // 4 . if word wasn't exist yet , initiate the initial one
            if (!storage.hasOwnProperty(preparedWord)) {
                storage[preparedWord] = []
            }
            // 5. push the group of anagram 
            storage[preparedWord].push(params[index]);
        }
        // 6. only return the values of storage , which contains the group of anagram 
        // and already fitted with the expected format data
        return Object.values(storage);

    } catch {
        return Array.isArray(params) ? params : [];
    }


}

const testOne = findAnagram(['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'])
console.log(testOne)
