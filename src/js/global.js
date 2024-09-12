// ===============================================================================JS MODULES================================================================================
import { FakeScroll } from "./modules/fakescroll";
// ===============================================================================JS LOGIC==================================================================================

const main = () => {
    document.addEventListener('DOMContentLoaded', () => {

        document.querySelectorAll('[data-fake-scroll]').forEach(scroll => {
            scroll.fakeScroll();
        });

        (function toggleMobileMenuDisplay() {
            const controlMobileMenu = document.querySelectorAll('[data-mobile-menu="btn"]');
            const mobileMenu = document.querySelector('[data-mobile-menu="nav"]');

            controlMobileMenu.forEach(btn => {
                btn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('active');
                    document.body.classList.toggle('off-scroll')
                })
            })
        })();


        (function customSelect() {
            const wrapper = document.querySelectorAll('[data-select="wrap"]');

            function clearActiveItem(list) {
                list.forEach(item => {
                    item.classList.remove('active')
                })
            }

            function toggleSelectDisplay(selectOptions, valueWrap) {
                selectOptions.classList.toggle('show');
                valueWrap.classList.toggle('active');
            }

            wrapper.forEach(select => {
                const input = select.querySelector('input[name="select"]');

                const valueWrap = select.querySelector('[data-select="value"]')
                const selectOptions = select.querySelector('[data-select="options"]')
                const list = selectOptions.querySelectorAll('li');

                valueWrap.addEventListener('click', () => {
                    toggleSelectDisplay(selectOptions, valueWrap);
                })

                list.forEach(option => {
                    option.addEventListener('click', () => {
                        valueWrap.innerHTML = option.textContent;
                        clearActiveItem(list);
                        toggleSelectDisplay(selectOptions, valueWrap);
                        option.classList.add('active')
                        input.value = option.getAttribute('option')
                    })
                })
            })
        })();


        (function customRange() {
            const inputRange = document.getElementById('range');
            const percentOutput = document.querySelector('.form__input-range-output')

            inputRange.addEventListener('input', () => {
                percentOutput.innerHTML = inputRange.value;
            })
        })();



    })



};

main();
