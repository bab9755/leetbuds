import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { cookies } from "next/headers"
import { SignJWT } from 'jose'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const createJWT = async (userId: any) => {
  try{
    const secretKey = new  TextEncoder().encode('your-secret-key')
    //use user id as the payload and sign with our secret
    const token =  new SignJWT({ userId: userId }).setProtectedHeader({alg: 'HS256'}).setIssuedAt().setExpirationTime('2h').sign(secretKey)
    return token;
  } catch(error) {
    console.log(`An error occured Generating the token: ${error}`)
  }
  
}

export const blind75 = [
  {
    problem: "Two Sum",
    difficulty: "Easy",
    videoSolution: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
    code: "https://leetcode.com/problems/two-sum/discuss/1234/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    problem: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    videoSolution: "https://www.youtube.com/watch?v=wiGpQwVHdE0",
    code: "https://leetcode.com/problems/longest-substring-without-repeating-characters/discuss/3545/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    problem: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    videoSolution: "https://www.youtube.com/watch?v=q6IEA26hvXc",
    code: "https://leetcode.com/problems/median-of-two-sorted-arrays/discuss/2541/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  },
  {
    problem: "Container With Most Water",
    difficulty: "Medium",
    videoSolution: "https://www.youtube.com/watch?v=UuiTKBwPgAo",
    code: "https://leetcode.com/problems/container-with-most-water/discuss/3935/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/container-with-most-water/"
  },
  {
    problem: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    videoSolution: "https://www.youtube.com/watch?v=1pkOgXD63yU",
    code: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/discuss/7654/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    problem: "Maximum Subarray",
    difficulty: "Medium",
    videoSolution: "https://www.youtube.com/watch?v=2MmGzdiKR9Y",
    code: "https://leetcode.com/problems/maximum-subarray/discuss/23456/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    problem: "Merge Intervals",
    difficulty: "Medium",
    videoSolution: "https://www.youtube.com/watch?v=44H3cEC2fFM",
    code: "https://leetcode.com/problems/merge-intervals/discuss/34567/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/merge-intervals/"
  },
  {
    problem: "Linked List Cycle",
    difficulty: "Easy",
    videoSolution: "https://www.youtube.com/watch?v=gBTe7lFR3vc",
    code: "https://leetcode.com/problems/linked-list-cycle/discuss/11235/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/linked-list-cycle/"
  },
  {
    problem: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    videoSolution: "https://www.youtube.com/watch?v=nIVW4P8b1VA",
    code: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/discuss/89776/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
  },
  {
    problem: "Climbing Stairs",
    difficulty: "Easy",
    videoSolution: "https://www.youtube.com/watch?v=Y0lT9Fck7qI",
    code: "https://leetcode.com/problems/climbing-stairs/discuss/12346/Solution-in-JavaScript",
    link: "https://leetcode.com/problems/climbing-stairs/"
  },
  // Add more objects as needed to cover the entire Blind 75 list
];



