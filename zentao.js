$(document).ready(function () {
    console.log('zentao statistics init')
    let search = window.location.search;

    if (search.includes('next')) {
        saveData()
        toNext()
    } else {
        const button = $(`<button class="my-btn">统计本月</button>`)
        button.on('click', function () {
            clearData()
            saveData()
            toNext()
        })

        $('body').append(button)
    }

})

const storageKey = 'zentao'
let allData = JSON.parse(sessionStorage.getItem(storageKey) || '[]')
const currentMonth = new Date().getMonth()

function clearData() {
    allData = []
    sessionStorage.removeItem(storageKey)
}

function saveData(current = true) {
    let $mainSide = $('.main.main-side');
    let find1 = $mainSide.find('fieldset:nth-child(2) .table');
    let find = $mainSide.find('fieldset:nth-child(3) .table tr:nth-child(2)');
    allData.push({
        taskId: $('#titlebar .prefix').text().trim(),
        expect: find1.find('tr:nth-child(4)').text().trim(),
        actual: find1.find('tr:nth-child(5)').text().trim(),
        name: find.find('td').text(),
        date: new Date(find.find('td').text().split('于').pop().trim())
    })
    // 判断完成时间
    const m = new Date(allData[allData.length - 1].date).getMonth();
    if (current && m !== currentMonth) {
        return
    }
    sessionStorage.setItem(storageKey, JSON.stringify(allData))
}

/**
 *
 * @param current 是否只统计当月
 */
function toNext(current = true) {
    const href = $('#next').attr('href');

    if (current) {
        const m = allData[allData.length - 1].date.getMonth();
        if (m !== currentMonth || !href) {
            alert('本月数据统计完毕！')
            // 剔除不属于当月的数据
            allData.pop()

            const totalExpect = allData.map(item => {
                // 分割字符串并过滤出数字部分
                const parts = item.expect.split(/[^0-9.]+/).filter(part => part.length > 0);
                return parseFloat(parts[0]) || 0
            }).reduce((prev, curr) => prev + curr, 0)
            const totalActual = allData.map(item => {
                // 分割字符串并过滤出数字部分
                const parts = item.expect.split(/[^0-9.]+/).filter(part => part.length > 0);
                return parseFloat(parts[0]) || 0
            }).reduce((prev, curr) => prev + curr, 0)
            console.table({totalExpect, totalActual})
            console.table(allData)
            return
        }
    }
    setTimeout(() => {
        !!href && (window.location.href = href + '?next')
    }, 1000)
}
