const inputNum = document.querySelector('.inputNum')
const inputStr = document.querySelector('.inputStr')
const inputNumBtn = document.querySelector('.inputNumBtn')
const inputStrBtn = document.querySelector('.inputStrBtn')

const checkboxActive = document.getElementById('active-radio-checkbox')
const checkbox = document.getElementById('radio-checkbox')

inputNumBtn.addEventListener('click', () => {
    inputStr.value = solution(Number(inputNum.value))
    checkboxActive.checked = ''
    checkbox.checked = 'checked'
})

inputStrBtn.addEventListener('click', () => {
    inputNum.value = solution(inputStr.value)
    checkbox.checked = ''
    checkboxActive.checked = 'checked'
})

function solution(roman) {
    const list = {
        I: 1,
        IV: 4,
        V: 5,
        IX: 9,
        X: 10,
        XL: 40,
        L: 50,
        XC: 90,
        C: 100,
        CD: 400,
        D: 500,
        CM: 900,
        M: 1000,
        V̅: 5000,
        X̅: 10000
    }
    const thousands = roman - (roman % 1000) 
    const hundreds = roman - (roman % 100) - thousands
    const dozens = (roman - (roman % 10)) - (roman - (roman % 100))
    const units = roman % 10
    const romaThousands = []
    const romaHundreds = []
    const romaDozens = []
    const romaUnits = []
    if(typeof roman === 'string') {
        const romanArr = roman.trim().toLocaleUpperCase().split('')
        const romanStr = roman.trim().toLocaleUpperCase()
        const num_900 = romanStr.match('CM') ? 200 : 0
        const num_400 = romanStr.match('CD') ? 200 : 0
        const num_90 = romanStr.match('XC') ? 20 : 0
        const num_40 = romanStr.match('XL') ? 20 : 0
        const num_9 = romanStr.match('IX') ? 2 : 0
        const num_4 = romanStr.match('IV') ? 2 : 0
       
        const sum = []
        for(const key in list) {
            for(let i = 0; i < romanArr.length; i++)
            if(key === romanArr[i]) {
                sum.push(list[key])
            }
        }
        const amount = sum.reduce((acc, elem) => {
            return acc + elem
        },0)
        return amount - num_900 - num_400 - num_90 - num_40 - num_9 - num_4
    } else if(typeof roman === 'number'){
        const keys = Object.keys(list);
        if(thousands >= 1000 && thousands < 5000) {
            romaThousands.push(keys[12].repeat(thousands / 1000))
        }
        switch(true) {
            case (hundreds < 400) :
                romaHundreds.push(keys[8].repeat(hundreds / 100))
                break
            case (hundreds === 400) :
                romaHundreds.push(keys[9])
                break
            case (hundreds === 500) :
                romaHundreds.push(keys[10])
                break
            case (hundreds > 500 && hundreds < 900) :
                romaHundreds.push(keys[10] + keys[8].repeat((hundreds - 500) / 100))
                break
            case (hundreds === 900) :
                romaHundreds.push(keys[11])
                break
            default :
                return 'Oops'
        }
        switch(true) {
            case (dozens < 40) :
                romaDozens.push(keys[4].repeat(dozens / 10))
                break
            case (dozens === 40) :
                romaDozens.push(keys[5])
                break
            case (dozens === 50) :
                romaDozens.push(keys[6])
                break
            case (dozens > 50 && dozens < 90) :
                romaDozens.push(keys[6] + keys[4].repeat((dozens - 50) / 10))
                break
            case (dozens === 90) :
                romaDozens.push(keys[7])
                break
            default :
                return 'Oops'
        }
        switch(true) {
            case (units < 4) :
                romaUnits.push(keys[0].repeat(units))
                break
            case (units === 4) :
                romaUnits.push(keys[1])
                break
            case (units === 5) :
                romaUnits.push(keys[2])
                break
            case (units > 5 && units < 9) :
                romaUnits.push(keys[2] + keys[0].repeat((units - 5)))
                break
            case (units === 9) :
                romaUnits.push(keys[3])
                break
            default :
                return 'Oops'
        }
        return `${romaThousands}${romaHundreds}${romaDozens}${romaUnits}`
    }
  }
