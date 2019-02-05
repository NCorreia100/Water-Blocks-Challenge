/*
Water Blocks

You are given an input array where each element represents the height of a line of towers. 

The width of every tower is 1.
It starts raining. How much water is collected between the towers? 
Eg. Input: [5, 2, 3, 2, 1, 3]
Output: 4
Visualization:

'-' is water
 '#' is a block

#
#
# - # -  -#
# # # # - #
# # # # # #
*/


const getWaterBetweenBuildings = (blocks) => {

    let blockArr = blocks, waterCount = 0;

    //get height of tallest and 2nd tallest buildings
    let tallest = Math.max(...blockArr)
    let secondTallest = blockArr.reduce((taller, cur) => {
        if (cur < taller || blockArr.indexOf(cur) === blockArr.indexOf(tallest)) return taller;
        else return cur;
    });

    //remove edges that don't accumate water nor leak water to nearest building
    while (blockArr[0] < blockArr[1]) blockArr.shift();
    while (blockArr[blockArr.length - 1] < blockArr[blockArr.length - 2]) blockArr.pop();    
    
    //if tallest and second tallest have same height and are on the edges
    if (blockArr[0] === tallest && blockArr[blockArr.length - 1] === tallest) {

        //iterate through each block incrementing difference between tallest and the block
        waterCount += blockArr.reduce((totalWater, curBlock) => {
            if (curBlock < tallest) return totalWater + tallest - curBlock;
            else return totalWater;
        }, 0);

    //otherwise:
    } else {

        //get heights for the leftmost and rightmost blocks
        let leftHeight = blockArr[0]
        let rightHeight = blockArr[blockArr.length - 1]

        //if height of leftmost block is lower than tallest:
        if (leftHeight < tallest) {
            // iterate left to right until reaching tallest, incrementing difference in height       
            for (let i = 1; i < blockArr.indexOf(tallest); i++){           
               
                if (leftHeight > blockArr[i]) waterCount += leftHeight - blockArr[i];
                else if (leftHeight <= tallest) leftHeight = blockArr[i];                
            }
        }
        //if height of rightmost block is lower than the tallest:
        if (rightHeight < tallest) {
            // iterate right to left until reaching tallest, incrementing difference in height           
            for(let i=blockArr.length-2; i > blockArr.indexOf(tallest);i--) {
                
                if (rightHeight > blockArr[i]) waterCount += rightHeight - blockArr[i];
                else if (rightHeight <= tallest) rightHeight = blockArr[i]                
            }
        }
    }
    return waterCount;
}



