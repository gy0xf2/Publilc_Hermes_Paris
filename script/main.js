//handle logo auto hide
const hermesLogo = document.querySelector('#header-hermes-logo')
const searchIcon = document.querySelector('.search-bar__icon')
const inputField = document.querySelector('#header-search-field')

const mobile = window.matchMedia('(min-width: 320px) and (max-width: 767px)')
const tabletAndDesktop = window.matchMedia('min-width: 768px')



function defaultSetup() {
    if (mobile.matches) {
        inputField.style.height = `0`
        inputField.style.transition = `none`
        inputField.style.border = `none`
        inputField.style.marginLeft = `0`
        inputField.style.paddingLeft = `0`
        return
    }
    inputField.style.height = `${36 / 13}rem`
    inputField.style.transition = `.2s ease-out`
    inputField.style.border = `1px solid #000`
    inputField.style.paddingLeft = `${40 / 13}rem`

}
function onFocus() {
    if (mobile.matches) {
        inputField.style.height = `${36 / 13}rem`
        inputField.style.transition = `.2s ease-out`
        inputField.style.border = `1px solid #000`
        inputField.style.marginLeft = `-5px`
        inputField.style.paddingLeft = `30px`
    }
    hermesLogo.style.visibility = 'hidden'
}

function onBlur() {
    defaultSetup()
    hermesLogo.style.visibility = 'visible'
}

window.addEventListener('load', defaultSetup)
window.addEventListener('resize', defaultSetup)

inputField.addEventListener('focus', onFocus)
inputField.addEventListener('blur', onBlur)
searchIcon.addEventListener('click', () => {
    inputField.focus()
})



//handle slide show



const slideShows = document.querySelectorAll('.product-popup--slide')
slideShows.forEach(slide => {

    /*This section for responsive*/
    //get slide-list of slide
    const imageList = slide.querySelector('.slide-list')



    /*This section is for the mobile*/
    const mobileDevice = window.matchMedia('(min-width: 320px) and (max-width: 767px)')
    const tabletAndDesktopDevice = window.matchMedia('(min-width: 768px)')

    //
    let currentPlace = slide.offsetWidth * -1, previousPlace = currentPlace, startX = 0, currentX = 0, deltaX = 0, currentIndex = 1


    //handle touch event




    function handleTouchStart(touchEvent) {
        if (mobileDevice.matches) {
            startX = touchEvent.touches[0].clientX
            slide.addEventListener('touchmove', handleTouchMove)
            slide.addEventListener('touchend', handleTouchEnd)
        }
    }

    function handleTouchMove(touchEvent) {
        currentX = touchEvent.touches[0].clientX
        deltaX = (currentX - startX)
        currentPlace = previousPlace + deltaX
        setTimeout(() => {
            setSlideByPlace()
        }, 10)
    }

    function handleTouchEnd(touchEvent) {
        slide.removeEventListener('touchmove', handleTouchMove)
        let movedDistance = currentPlace - previousPlace
        if (movedDistance * -1 > imageList.offsetWidth / 100 * 40 && currentIndex < imageList.children.length - 2) currentIndex++
        if (movedDistance > imageList.offsetWidth / 100 * 40 && currentIndex > 1) currentIndex--
        setSlideByIndex()
        handleSlideProcess()
    }


    //setup slide
    function setSlideByPlace() {
        imageList.style.transform = `translateX(${currentPlace}px)`
    }


    function handleSlideProcess() {
        const process = slide.querySelectorAll('.process__dot')
        process.forEach(dot => {
            dot.classList.remove('process__active')
        })
        process[currentIndex - 1].classList.add('process__active')
    }

    function setSlideByIndex() {
        currentPlace = currentIndex * imageList.offsetWidth * -1
        previousPlace = currentPlace
        imageList.style.transform = `translateX(${currentIndex * imageList.offsetWidth * -1}px)`
    }


    //handle change device
    function handleChangeDevie() {
        resetSize()
        if (mobileDevice.matches) {
            currentPlace = imageList.offsetWidth * -1
            previousPlace = currentPlace
            deltaX = 0
            startX = 0
            currentX = 0
        }
        resetToIndex(1)
    }


    function resetToIndex(index) {
        imageList.style.transition = 'none'
        currentIndex = index
        setSlideByIndex()
        handleSlideProcess()
        setTimeout(() => {
            imageList.style.transition = '.4s ease-in-out'
        }, 10)
    }

    function resetSize() {
        imageList.style.width = `${slide.offsetWidth}px`
    }

    window.addEventListener('resize', handleChangeDevie)
    window.addEventListener('load', resetSize)

    slide.addEventListener('touchstart', handleTouchStart)





    /*This section for the tablet and desktop devices*/
    //get control buttons
    const next = slide.querySelector('.next')
    const prev = slide.querySelector('.prev')


    //handle mouse event
    function handleMouseOver(mouseEvent) {
        if (tabletAndDesktopDevice.matches) {
            currentIndex = 2
            setSlideByIndex()
            displayControlButton()
            slide.addEventListener('mouseleave', handleMouseLeave)
        }
    }

    function handleMouseLeave(mouseEvent) {
        resetToIndex(1)
        hideControlButton()
    }


    //handle control buttons display
    function displayControlButton() {
        slide.querySelectorAll('.slide-list--control').forEach(button => {
            button.style.visibility = 'visible'
        })
    }
    function hideControlButton() {
        slide.querySelectorAll('.slide-list--control').forEach(button => {
            button.style.visibility = 'hidden'
        })
    }



    //handle control buttons
    let isClickable = true
    function nextSlide() {
        if (isClickable) {
            isClickable = false
            if (currentIndex < imageList.children.length - 1) {
                currentIndex++
                setSlideByIndex()
            }
            if (currentIndex == imageList.children.length - 1) {
                setTimeout(() => {
                    imageList.style.transition = 'none'
                    currentIndex = 1
                    setSlideByIndex()
                }, 400)
            }
            imageList.style.transition = '.4s ease-in-out'

            setTimeout(() => {
                isClickable = true
            }, 400)
        }
    }

    function prevSlide() {
        if (isClickable) {
            isClickable = false
            if (currentIndex > 0) {
                currentIndex--
                setSlideByIndex()
            }
            if (currentIndex == 0) {
                setTimeout(() => {
                    imageList.style.transition = 'none'
                    currentIndex = imageList.children.length - 2
                    setSlideByIndex()
                }, 400)
            }
            imageList.style.transition = '.4s ease-in-out'
            setTimeout(() => {
                isClickable = true
            }, 400)
        }
    }


    function setSlideByIndex_Desktop() {
        imageList.style.transform = `translateX(${currentIndex * imageList.offsetWidth * -1}px)`
    }
    next.addEventListener('click', nextSlide)
    prev.addEventListener('click', prevSlide)
    slide.addEventListener('mouseenter', handleMouseOver)

})



//handle sticky header when scroll
const header = document.querySelector('.header-main')

window.addEventListener('scroll', () => {
    if (window.scrollY > header.offsetTop) {
        header.classList.add('sticky')
    }
    else {
        header.classList.remove('sticky')
    }
})
