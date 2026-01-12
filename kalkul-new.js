 (function(){
 'use strict';

// Global variables for photo management
let uploadedPhotos = [];
const photoInput = document.createElement('input');
const HISTORY_KEY = 'calculatorHistory';
const MAX_HISTORY_ITEMS = 20;
photoInput.type = 'file';
photoInput.accept = 'image/*';
photoInput.multiple = true;
photoInput.style.display = 'none';

// Discount variable
let currentDiscount = 0;
const calcRoot = document.getElementById('calcCell_Bablo');
if (!calcRoot) return;
const $ = (selector, scope = calcRoot) => (scope || calcRoot).querySelector(selector);
const $$ = (selector, scope = calcRoot) => Array.from((scope || calcRoot).querySelectorAll(selector));
const addListener = (el, event, handler, options) => {
    if (!el) return;
    el.addEventListener(event, handler, options);
};
const miniTotals = document.getElementById('miniTotals');
const totalsBlock = document.getElementById('calcTotals');
const galleryInput = document.createElement('input');
galleryInput.type = 'file';
galleryInput.accept = 'image/*';
galleryInput.multiple = true;
galleryInput.style.display = 'none';

const ACTIVE_EXTRAS_KEY = 'snCalcActiveExtras';
const DEFAULT_ACTIVE_EXTRAS = ['calc_LUSTR', 'calc_SVETILNIK', 'calc_GARDIN'];
const extraConfigs = [
    { id: 'calc_LUSTR', group: 'Установка' },
    { id: 'calc_SVETILNIK', group: 'Установка' },
    { id: 'calc_GARDIN', group: 'Установка' },
    { id: 'calc_SVETILNIK_cena', group: 'Материал' },
    { id: 'calc_SVETILNIK_model', group: 'Материал' },
    { id: 'calc_GARDINA', group: 'Материал' },
    { id: 'calc_BLENDA', group: 'Материал' },
    { id: 'calc_BLENDA_model', group: 'Материал' },
    { id: 'calc_PULT', group: 'Материал' },
    { id: 'calc_TRUB', group: 'Дополнительные работы' },
    { id: 'calc_BSTAVKA', group: 'Дополнительные работы' },
    { id: 'calc_BSTAVKAb', group: 'Дополнительные работы' },
    { id: 'calc_KERAM', group: 'Дополнительные работы' },
    { id: 'calc_GOFRA', group: 'Дополнительные работы' },
    { id: 'calc_BRUS_50_50', group: 'Дополнительные работы' },
    { id: 'calc_BRUS_100_50', group: 'Дополнительные работы' },
    { id: 'GARDIN_BP40', group: 'Карнизы' },
    { id: 'GARDIN_Sigma', group: 'Карнизы' },
    { id: 'GARDIN_PK15', group: 'Карнизы' },
    { id: 'GARDIN_PK14', group: 'Карнизы' },
    { id: 'GARDIN_AM', group: 'Карнизы' },
    { id: 'GARDIN_PODsvetka', group: 'Карнизы' },
    { id: 'LINIEA1', group: 'Линии' },
    { id: 'LINIEA3', group: 'Линии' },
    { id: 'LINIEA5', group: 'Линии' },
    { id: 'Paryashchiy', group: 'Профиля' },
    { id: 'Konturnyy', group: 'Профиля' },
    { id: 'calc_ZASVET', group: 'Профиля' },
    { id: 'calc_RAZDELITEL', group: 'Профиля' },
    { id: 'calc_ALUMIN_PROF', group: 'Профиля' },
    { id: 'calc_PVX_TEN', group: 'Профиля' },
    { id: 'calc_ALUMIN_TEN', group: 'Профиля' },
    { id: 'calc_ALUMIN_TEN_UGL', group: 'Профиля' },
    { id: 'LENTA_WHITE_2700', group: 'Лента' },
    { id: 'LENTA_WHITE_4000', group: 'Лента' },
    { id: 'LENTA_WHITE_6500', group: 'Лента' },
    { id: 'LENTA_RGB', group: 'Лента' },
    { id: 'LENTA_RGB_CCT', group: 'Лента' },
    { id: 'LENTA_POWER', group: 'Лента' },
    { id: 'LENTA_CONTROLLER', group: 'Лента' },
    { id: 'nakladnoy_t', group: 'Треки' },
    { id: 'vstraivayemyy_t', group: 'Треки' },
    { id: 'magnitnyy_t', group: 'Треки' }
];
const extrasRegistry = new Map();
const extrasButtons = new Map();
const activeExtras = new Set();

function sanitizeNumberInput(input) {
    const raw = input.value.replace(',', '.');
    if (raw === '') {
        return;
    }
    let num = parseFloat(raw);
    if (Number.isNaN(num) || num < 0) {
        num = 0;
    }
    input.value = num;
}

function getNumberValue(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const value = parseFloat(String(el.value).replace(',', '.'));
    if (Number.isNaN(value) || value < 0) {
        return 0;
    }
    return value;
}

function getInputNumberValue(input) {
    if (!input) return 0;
    const value = parseFloat(String(input.value).replace(',', '.'));
    if (Number.isNaN(value) || value < 0) {
        return 0;
    }
    return value;
}

function getInputStepValue(input) {
    const step = parseFloat(input.step);
    if (!Number.isNaN(step) && Number.isFinite(step) && step > 0) {
        return step;
    }
    return 1;
}

function getAreaValue() {
    return getNumberValue('calc_KB_3') + getNumberValue('calc_KB_5');
}

function updateSendAvailability() {
    const sendBtn = document.getElementById('sendToTelegram');
    const stickyBtn = document.getElementById('stickySendBtn');
    const canSend = getAreaValue() > 0;
    if (sendBtn) {
        sendBtn.disabled = !canSend;
        sendBtn.classList.toggle('sn-calc__button--disabled', !canSend);
    }
    if (stickyBtn) {
        stickyBtn.classList.toggle('is-disabled', !canSend);
    }
    return canSend;
}

function getStoredActiveExtras() {
    const raw = localStorage.getItem(ACTIVE_EXTRAS_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn('Failed to parse active extras state', error);
        return [];
    }
}

function saveActiveExtras() {
    localStorage.setItem(ACTIVE_EXTRAS_KEY, JSON.stringify(Array.from(activeExtras)));
}

function getExtraLabel(row, fallback) {
    const cell = row ? row.querySelector('td') : null;
    return cell ? cell.textContent.trim() : fallback;
}

function buildExtrasRegistry() {
    extraConfigs.forEach((config) => {
        const input = document.getElementById(config.id);
        if (!input) return;
        const row = input.closest('tr');
        if (!row) return;
        const originParent = row.parentElement;
        const originIndex = Array.from(originParent.children).indexOf(row);
        extrasRegistry.set(config.id, {
            id: config.id,
            group: config.group,
            input,
            row,
            label: getExtraLabel(row, config.id),
            originParent,
            originIndex
        });
    });
}

function ensureRemoveControl(extra) {
    if (!extra || !extra.row) return;
    if (extra.row.querySelector('.sn-calc__extra-remove')) return;
    const actionCell = document.createElement('td');
    actionCell.className = 'sn-calc__extra-actions';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sn-calc__extra-remove';
    btn.setAttribute('aria-label', 'Удалить');
    btn.textContent = '×';
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        removeExtraById(extra.id);
    });
    actionCell.appendChild(btn);
    extra.row.appendChild(actionCell);
}

function attachSwipeHandlers(extra) {
    if (!extra || !extra.row || extra.row.dataset.swipeReady) return;
    extra.row.dataset.swipeReady = 'true';
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isSwiping = false;
    let directionLocked = false;
    let activePointerId = null;
    const swipeThreshold = () => Math.max(80, extra.row.offsetWidth * 0.35);

    const shouldIgnoreSwipe = (event) => {
        const target = event.target;
        return target && target.closest && target.closest('input, select, textarea, button');
    };

    const startSwipe = (clientX, clientY) => {
        startX = clientX;
        startY = clientY;
        currentX = 0;
        isSwiping = false;
        directionLocked = false;
        extra.row.style.transition = 'none';
    };

    const moveSwipe = (clientX, clientY, event) => {
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        if (!directionLocked) {
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 6) {
                isSwiping = true;
                directionLocked = true;
            } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 6) {
                directionLocked = true;
            }
        }
        if (!isSwiping) {
            return;
        }
        if (event && event.cancelable) {
            event.preventDefault();
        }
        currentX = deltaX;
        extra.row.style.transform = `translateX(${currentX}px)`;
    };

    const endSwipe = () => {
        extra.row.style.transition = '';
        if (!isSwiping) {
            extra.row.style.transform = '';
            return;
        }
        const threshold = swipeThreshold();
        if (Math.abs(currentX) >= threshold) {
            const direction = currentX >= 0 ? 1 : -1;
            const exitX = direction > 0 ? '100%' : '-100%';
            extra.row.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
            extra.row.style.transform = `translateX(${exitX})`;
            extra.row.style.opacity = '0';
            extra.row.style.setProperty('--sn-calc-exit-x', exitX);
            setTimeout(() => {
                extra.row.style.transition = '';
                extra.row.style.opacity = '';
                removeExtraById(extra.id, { exitX });
            }, 200);
        } else {
            extra.row.style.transform = '';
        }
        isSwiping = false;
        directionLocked = false;
        currentX = 0;
    };

    if (window.PointerEvent) {
        const onPointerDown = (event) => {
            if (event.pointerType === 'mouse' && event.button !== 0) return;
            if (shouldIgnoreSwipe(event)) return;
            activePointerId = event.pointerId;
            startSwipe(event.clientX, event.clientY);
            extra.row.setPointerCapture(activePointerId);
        };

        const onPointerMove = (event) => {
            if (activePointerId !== event.pointerId) return;
            moveSwipe(event.clientX, event.clientY, event);
        };

        const onPointerEnd = (event) => {
            if (activePointerId !== event.pointerId) return;
            extra.row.releasePointerCapture(activePointerId);
            activePointerId = null;
            endSwipe();
        };

        extra.row.addEventListener('pointerdown', onPointerDown);
        extra.row.addEventListener('pointermove', onPointerMove, { passive: false });
        extra.row.addEventListener('pointerup', onPointerEnd);
        extra.row.addEventListener('pointercancel', onPointerEnd);
    } else {
        const onTouchStart = (event) => {
            if (event.touches.length !== 1) return;
            if (shouldIgnoreSwipe(event)) return;
            startSwipe(event.touches[0].clientX, event.touches[0].clientY);
        };

        const onTouchMove = (event) => {
            if (event.touches.length !== 1) return;
            moveSwipe(event.touches[0].clientX, event.touches[0].clientY, event);
        };

        const onTouchEnd = () => {
            endSwipe();
        };

        extra.row.addEventListener('touchstart', onTouchStart, { passive: true });
        extra.row.addEventListener('touchmove', onTouchMove, { passive: false });
        extra.row.addEventListener('touchend', onTouchEnd);
        extra.row.addEventListener('touchcancel', onTouchEnd);
    }
}

function updateExtrasEmptyState() {
    const emptyState = document.getElementById('activeExtrasEmpty');
    if (!emptyState) return;
    emptyState.style.display = activeExtras.size === 0 ? 'block' : 'none';
}

function insertRowToOrigin(extra) {
    const { originParent, originIndex, row } = extra;
    const rows = Array.from(originParent.children);
    if (rows[originIndex]) {
        originParent.insertBefore(row, rows[originIndex]);
    } else {
        originParent.appendChild(row);
    }
}

function resetExtraValue(extra) {
    if (!extra || !extra.input) return;
    if (extra.input.type === 'text' || extra.input.tagName === 'TEXTAREA') {
        extra.input.value = '';
    } else {
        extra.input.value = '0';
    }
    extra.input.dispatchEvent(new Event('input', { bubbles: true }));
}

function addExtraById(id, options = {}) {
    const extra = extrasRegistry.get(id);
    const list = document.getElementById('activeExtrasTable');
    if (!extra || !list) return;
    if (activeExtras.has(id) && extra.row.parentElement === list) return;
    ensureRemoveControl(extra);
    extra.row.classList.remove('sn-calc__extra-row--exit');
    extra.row.classList.add('sn-calc__extra-row', 'sn-calc__extra-row--enter');
    list.appendChild(extra.row);
    activeExtras.add(id);
    if (extrasButtons.has(id)) {
        extrasButtons.get(id).hidden = true;
    }
    updateExtrasEmptyState();
    attachSwipeHandlers(extra);
    requestAnimationFrame(() => {
        extra.row.classList.add('sn-calc__extra-row--enter-active');
        setTimeout(() => {
            extra.row.classList.remove('sn-calc__extra-row--enter', 'sn-calc__extra-row--enter-active');
        }, 160);
    });
    if (options.scroll !== false) {
        extra.row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (options.focus !== false) {
        setTimeout(() => {
            extra.input.focus();
        }, 160);
    }
    extra.input.dispatchEvent(new Event('input', { bubbles: true }));
    if (options.save !== false) {
        saveActiveExtras();
    }
}

function removeExtraById(id, options = {}) {
    const extra = extrasRegistry.get(id);
    if (!extra || !activeExtras.has(id)) return;
    resetExtraValue(extra);
    if (options.exitX) {
        extra.row.style.setProperty('--sn-calc-exit-x', options.exitX);
    } else {
        extra.row.style.removeProperty('--sn-calc-exit-x');
    }
    extra.row.classList.add('sn-calc__extra-row--exit');
    const delay = options.delay ?? 150;
    setTimeout(() => {
        insertRowToOrigin(extra);
        extra.row.style.transform = '';
        extra.row.style.opacity = '';
        extra.row.style.removeProperty('--sn-calc-exit-x');
        activeExtras.delete(id);
        if (extrasButtons.has(id)) {
            extrasButtons.get(id).hidden = false;
        }
        updateExtrasEmptyState();
        if (options.save !== false) {
            saveActiveExtras();
        }
    }, delay);
}

function renderExtrasButtons() {
    extraConfigs.forEach((config) => {
        const extra = extrasRegistry.get(config.id);
        if (!extra) return;
        const container = $(`.sn-calc__extras-buttons[data-group="${config.group}"]`);
        if (!container) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'sn-calc__extra-button';
        button.textContent = extra.label;
        button.addEventListener('click', () => addExtraById(config.id));
        container.appendChild(button);
        extrasButtons.set(config.id, button);
    });
}

function resolveInitialActiveExtras() {
    const stored = getStoredActiveExtras();
    const initial = stored.length ? stored : DEFAULT_ACTIVE_EXTRAS;
    initial.forEach((id) => {
        if (extrasRegistry.has(id)) {
            activeExtras.add(id);
        }
    });
    extrasRegistry.forEach((extra) => {
        if (!extra.input) return;
        if (extra.input.type === 'text' || extra.input.tagName === 'TEXTAREA') {
            if (extra.input.value.trim() !== '') {
                activeExtras.add(extra.id);
            }
        } else if (getNumberValue(extra.id) > 0) {
            activeExtras.add(extra.id);
        }
    });
}

function syncActiveExtrasUI() {
    const list = document.getElementById('activeExtrasTable');
    if (!list) return;
    extrasRegistry.forEach((extra) => {
        if (activeExtras.has(extra.id)) {
            addExtraById(extra.id, { save: false, focus: false, scroll: false });
        } else if (extrasButtons.has(extra.id)) {
            extrasButtons.get(extra.id).hidden = false;
        }
    });
    updateExtrasEmptyState();
    saveActiveExtras();
}

function setupExtras() {
    buildExtrasRegistry();
    renderExtrasButtons();
    resolveInitialActiveExtras();
    syncActiveExtrasUI();
}

function refreshExtrasAfterStateLoad() {
    extrasRegistry.forEach((extra) => insertRowToOrigin(extra));
    activeExtras.clear();
    resolveInitialActiveExtras();
    syncActiveExtrasUI();
}

function validateObjectField() {
    const objectInput = document.getElementById('calc_object');
    const errorMessage = document.getElementById('objectError');
    const calcObject = objectInput.value.trim();
    if (calcObject === "") {
        objectInput.classList.add('sn-calc__input-error');
        if (errorMessage) {
            errorMessage.textContent = "⛔️ Заполните поле 'Объект'.";
        }
        objectInput.focus();
        return false;
    }
    objectInput.classList.remove('sn-calc__input-error');
    if (errorMessage) {
        errorMessage.textContent = '';
    }
    return true;
}

function buildSummaryContent() {
    const objectValue = document.getElementById('calc_object').value.trim();
    const areaValue = getAreaValue();
    const extrasList = [];
    activeExtras.forEach((id) => {
        const extra = extrasRegistry.get(id);
        if (!extra) return;
        const value = extra.input.value;
        if (extra.input.type === 'text' || extra.input.tagName === 'TEXTAREA') {
            if (value.trim() === '') return;
            extrasList.push(`${extra.label}: ${value.trim()}`);
            return;
        }
        const numericValue = getNumberValue(id);
        if (numericValue <= 0) return;
        const unit = extra.row.querySelector('.unit');
        extrasList.push(`${extra.label}: ${numericValue}${unit ? ` ${unit.textContent}` : ''}`);
    });

    const mountFields = [];
    const typeValue = document.getElementById('calc_object_type').value;
    const furnitureValue = document.getElementById('calc_object_furniture').value;
    const repairValue = document.getElementById('calc_object_repair').value;
    if (typeValue) mountFields.push(`Тип объекта: ${typeValue}`);
    if (furnitureValue) mountFields.push(`Мебель: ${furnitureValue}`);
    if (repairValue) mountFields.push(`Ремонт: ${repairValue}`);

    let html = `
        <div><strong>Объект:</strong> ${objectValue}</div>
        <div><strong>Площадь:</strong> ${areaValue} м²</div>
    `;
    if (extrasList.length) {
        html += `<div><strong>Добавленные допы:</strong><ul>${extrasList.map(item => `<li>${item}</li>`).join('')}</ul></div>`;
    }
    if (mountFields.length) {
        html += `<div><strong>Для монтажников:</strong><ul>${mountFields.map(item => `<li>${item}</li>`).join('')}</ul></div>`;
    }
    return html;
}

function openSummaryModal() {
    const modal = document.getElementById('sendSummaryModal');
    const content = document.getElementById('sendSummaryContent');
    if (!modal || !content) return;
    content.innerHTML = buildSummaryContent();
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    lockBodyScroll();
    const cancelBtn = document.getElementById('cancelSendBtn');
    const confirmBtn = document.getElementById('confirmSendBtn');
    if (cancelBtn) {
        cancelBtn.focus();
    } else if (confirmBtn) {
        confirmBtn.focus();
    }
}

function closeSummaryModal() {
    const modal = document.getElementById('sendSummaryModal');
    if (!modal) return;
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
}

function handleSendClick() {
    if (!updateSendAvailability()) {
        return;
    }
    if (!validateObjectField()) {
        return;
    }
    openSummaryModal();
}

function lockBodyScroll() {
    if (document.body.dataset.snCalcOverflow === undefined) {
        document.body.dataset.snCalcOverflow = document.body.style.overflow || '';
    }
    document.body.style.overflow = 'hidden';
}

function unlockBodyScroll() {
    if (document.body.dataset.snCalcOverflow !== undefined) {
        document.body.style.overflow = document.body.dataset.snCalcOverflow;
        delete document.body.dataset.snCalcOverflow;
    }
}

function setMiniTotalsVisibility(show) {
    if (!miniTotals) return;
    miniTotals.hidden = !show;
    miniTotals.classList.toggle('is-visible', show);
}

let historyLastFocus = null;

function openHistoryPanel() {
    const historyPanel = document.getElementById('historyPanel');
    if (!historyPanel) return;
    historyLastFocus = document.activeElement;
    historyPanel.classList.add('show');
    historyPanel.setAttribute('aria-hidden', 'false');
    historyPanel.removeAttribute('inert');
    if ('inert' in historyPanel) {
        historyPanel.inert = false;
    }
    const focusTarget = document.getElementById('historySearch') || historyPanel.querySelector('.close-history') || historyPanel;
    if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
    }
}

function closeHistoryPanel() {
    const historyPanel = document.getElementById('historyPanel');
    if (!historyPanel) return;
    const showHistoryBtn = document.getElementById('showHistory');
    let focusTarget = null;
    if (historyLastFocus && historyLastFocus.isConnected && !historyPanel.contains(historyLastFocus)) {
        focusTarget = historyLastFocus;
    } else if (showHistoryBtn) {
        focusTarget = showHistoryBtn;
    }
    if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
    }
    historyPanel.classList.remove('show');
    historyPanel.setAttribute('aria-hidden', 'true');
    historyPanel.setAttribute('inert', '');
    if ('inert' in historyPanel) {
        historyPanel.inert = true;
    }
}

function updateMiniTotals(values = []) {
    if (!miniTotals) return;
    const chips = miniTotals.querySelectorAll('.sn-calc__mini-chip');
    values.forEach((value, index) => {
        if (chips[index]) {
            chips[index].querySelector('span').textContent = numberWithSpaces(value);
        }
    });
}

function updateDiscountStatus() {
    const status = document.getElementById('discountStatus');
    if (!status) return;
    status.textContent = currentDiscount === 0 ? 'Корректировка не применяется.' : 'Корректировка применена.';
}

function setDiscountVisibility(show) {
    calcRoot.classList.toggle('sn-calc--show-discounts', show);
    localStorage.setItem('snCalcShowDiscounts', show ? 'true' : 'false');
}

document.addEventListener('DOMContentLoaded', function() {
    const savedState = localStorage.getItem('lastCalculation');
    if (savedState) {
        const state = JSON.parse(savedState);
        Object.keys(state).forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (el.type === 'checkbox') {
                    el.checked = state[id];
                } else {
                    el.value = state[id];
                }
            }
        });
    }

    const calcHeight = document.getElementById('calc_height');
    if (calcHeight && !calcHeight.value) {
        calcHeight.value = '2.5';
    }

    setDiscountVisibility(localStorage.getItem('snCalcShowDiscounts') === 'true');

    // Обработчики для полей ввода, чтобы правильно работать с числами < 1
    $$('input[type="number"]').forEach(input => {
        input.addEventListener('focus', function() {
            if (this.value === '0') {
                this.value = '';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '' || this.value === '.') {
                this.value = '0';
            } else if (this.value.startsWith('.')) {
                this.value = '0' + this.value;
            }
        });
        
        input.addEventListener('input', function(e) {
            // Разрешаем ввод точки
            if (this.value === '.') return;
            
            // Обрабатываем случаи с точкой
            if (this.value.includes('.')) {
                const parts = this.value.split('.');
                if (parts[0] === '' || parts[0] === '0') {
                    // Для значений типа .5 или 0.5 оставляем как есть
                    return;
                }
            }
            
            // Удаляем ведущие нули для целых чисел
            if (this.value.startsWith('0') && this.value.length > 1 && !this.value.startsWith('0.')) {
                this.value = this.value.replace(/^0+/, '');
            }
        });
    });

    const recalc = () => {
        getres_Bablo();
        localStorage.setItem('lastCalculation', JSON.stringify(getCurrentState()));
        updateSendAvailability();
    };

    calcRoot.addEventListener('input', (event) => {
        if (event.target.matches('input[type="number"]')) {
            sanitizeNumberInput(event.target);
        }
        if (event.target.id === 'calc_object') {
            event.target.classList.remove('sn-calc__input-error');
            const errorMessage = document.getElementById('objectError');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        }
        recalc();
    });

    calcRoot.addEventListener('change', recalc);

    addListener(document.getElementById('sendToTelegram'), 'click', handleSendClick);
    addListener(document.getElementById('saveCalculation'), 'click', saveCurrentCalculation);
    addListener(document.getElementById('showHistory'), 'click', () => {
        renderHistory();
        openHistoryPanel();
    });
    addListener($('.close-history'), 'click', closeHistoryPanel);
    addListener(document.getElementById('historySearch'), 'input', renderHistory);

    const stickyPriceBtn = document.getElementById('stickyPriceBtn');
    const stickyClearBtn = document.getElementById('stickyClearBtn');
    const stickySendBtn = document.getElementById('stickySendBtn');

    if (stickyPriceBtn && miniTotals) {
        stickyPriceBtn.addEventListener('click', () => {
            const shouldShow = miniTotals.hidden || !miniTotals.classList.contains('is-visible');
            setMiniTotalsVisibility(shouldShow);
        });
    }

    if (stickyClearBtn) {
        stickyClearBtn.addEventListener('click', () => {
            document.getElementById('clearBtn').click();
        });
    }

    if (stickySendBtn) {
        stickySendBtn.addEventListener('click', () => {
            document.getElementById('sendToTelegram').click();
        });
    }

    const confirmSendBtn = document.getElementById('confirmSendBtn');
    const cancelSendBtn = document.getElementById('cancelSendBtn');
    const modal = document.getElementById('sendSummaryModal');
    if (confirmSendBtn) {
        confirmSendBtn.addEventListener('click', () => {
            closeSummaryModal();
            sendToTelegramHandler();
        });
    }
    if (cancelSendBtn) {
        cancelSendBtn.addEventListener('click', closeSummaryModal);
    }
    if (modal) {
        modal.querySelectorAll('[data-modal-close]').forEach((el) => {
            el.addEventListener('click', closeSummaryModal);
        });
    }
    
    const setupNumberInputGroup = (inputGroup, input) => {
        if (!inputGroup || inputGroup.dataset.numberReady) return;
        const numberInput = input || inputGroup.querySelector('input[type="number"]');
        if (!numberInput) return;
        let incrementBtn = inputGroup.querySelector('.increment');
        let decrementBtn = inputGroup.querySelector('.decrement');
        if (!decrementBtn) {
            decrementBtn = document.createElement('button');
            decrementBtn.type = 'button';
            decrementBtn.className = 'decrement';
            decrementBtn.textContent = '-';
            inputGroup.insertBefore(decrementBtn, inputGroup.firstChild);
        }
        if (!incrementBtn) {
            incrementBtn = document.createElement('button');
            incrementBtn.type = 'button';
            incrementBtn.className = 'increment';
            incrementBtn.textContent = '+';
            inputGroup.appendChild(incrementBtn);
        }
        const applyDelta = (delta) => {
            const step = getInputStepValue(numberInput);
            const currentValue = getInputNumberValue(numberInput);
            numberInput.value = Math.max(0, currentValue + delta * step);
            sanitizeNumberInput(numberInput);
            numberInput.dispatchEvent(new Event('input', { bubbles: true }));
        };
        incrementBtn.addEventListener('click', (event) => {
            event.preventDefault();
            applyDelta(1);
        });
        decrementBtn.addEventListener('click', (event) => {
            event.preventDefault();
            applyDelta(-1);
        });
        inputGroup.dataset.numberReady = 'true';
    };

    const wrapNumberInput = (input) => {
        if (!input || input.closest('.number-input')) return;
        let unitWrapper = input.closest('.input-with-unit');
        if (!unitWrapper) {
            unitWrapper = document.createElement('div');
            unitWrapper.className = 'input-with-unit';
            input.parentNode.insertBefore(unitWrapper, input);
            unitWrapper.appendChild(input);
        }
        const inputGroup = document.createElement('div');
        inputGroup.className = 'number-input';
        const decrementBtn = document.createElement('button');
        decrementBtn.type = 'button';
        decrementBtn.className = 'decrement';
        decrementBtn.textContent = '-';
        const incrementBtn = document.createElement('button');
        incrementBtn.type = 'button';
        incrementBtn.className = 'increment';
        incrementBtn.textContent = '+';
        const parent = unitWrapper.parentNode;
        parent.insertBefore(inputGroup, unitWrapper);
        inputGroup.appendChild(decrementBtn);
        inputGroup.appendChild(unitWrapper);
        inputGroup.appendChild(incrementBtn);
        setupNumberInputGroup(inputGroup, input);
    };

    $$('input[type="number"]').forEach((input) => {
        if (input.closest('.number-input')) {
            setupNumberInputGroup(input.closest('.number-input'), input);
        } else {
            wrapNumberInput(input);
        }
    });

    const objectAccordionToggle = $('.sn-calc__accordion-toggle');
    if (objectAccordionToggle) {
        const content = objectAccordionToggle.parentElement.querySelector('.sn-calc__accordion-content');
        objectAccordionToggle.addEventListener('click', () => {
            const isOpen = content.classList.toggle('is-open');
            objectAccordionToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            content.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        });
    }
    
    // Initialize collapsible sections
    $$('.sn-calc__section-title[role="button"]').forEach(title => {
        const content = title.parentElement.querySelector('.sn-calc__section-content');
        if (!content) return;
        if (title.getAttribute('aria-expanded') === 'true') {
            content.classList.add('is-open');
        }
        const toggle = () => {
            const isOpen = content.classList.toggle('is-open');
            title.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };
        title.addEventListener('click', toggle);
        title.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle();
            }
        });
    });
        
    // Initially hide sections that should be collapsed by default
    const sectionsToCollapse = ['Профиля:', 'Треки:', 'Лента:', 'Линии:', 'Карнизы:', 'Допы и профили'];
    $$('.sn-calc__section-title[role="button"]').forEach(title => {
        if (sectionsToCollapse.includes(title.textContent.trim())) {
            const content = title.parentElement.querySelector('.sn-calc__section-content');
            if (content) {
                content.classList.remove('is-open');
                title.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Initialize discount options
    $$('.sn-calc__discount-option').forEach(option => {
        option.addEventListener('click', function() {
            $$('.sn-calc__discount-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentDiscount = parseFloat(this.dataset.discount) || 0;
            updateDiscountStatus();
            getres_Bablo();
        });
    });
    
    // Set default discount
    const defaultDiscount = $('.sn-calc__discount-option[data-discount="0"]');
    if (defaultDiscount) {
        defaultDiscount.classList.add('active');
    }
    updateDiscountStatus();
    setDiscountVisibility(localStorage.getItem('snCalcShowDiscounts') === 'true');
    
    // Photo upload event listeners
    addListener(document.getElementById('takePhotoBtn'), 'click', function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.camera) {
            // For Cordova apps
            navigator.camera.getPicture(onPhotoSuccess, onPhotoError, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                correctOrientation: true
            });
        } else {
            // For browser - simulate camera with file input
            photoInput.capture = 'camera';
            photoInput.onchange = handleFileSelect;
            photoInput.click();
        }
    });

    // Затем в обработчике кнопки "Галерея":
    addListener(document.getElementById('choosePhotoBtn'), 'click', function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.camera) {
            // Для Cordova приложений
            navigator.camera.getPicture(onPhotoSuccess, onPhotoError, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                correctOrientation: true
            });
        } else {
            // Для браузера
            galleryInput.onchange = handleFileSelect;
            galleryInput.click();
        }
    });

    if (miniTotals) {
        miniTotals.hidden = true;
        miniTotals.classList.remove('is-visible');
    }

    addListener(miniTotals, 'click', () => {
        if (!totalsBlock) return;
        totalsBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    addListener(miniTotals, 'keydown', (event) => {
        if (!totalsBlock) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            totalsBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    setupExtras();
    updatePhotoStatus();
    recalc();
});

function onPhotoSuccess(imageData) {
    // For Cordova apps
    const photo = {
        data: 'data:image/jpeg;base64,' + imageData,
        name: 'photo_' + new Date().getTime() + '.jpg'
    };
    addPhoto(photo);
}

function onPhotoError(message) {
    console.error('Failed to get photo: ' + message);
    updatePhotoStatus('Ошибка при загрузке фото', 'error');
}

function handleFileSelect(event) {
    // For browser
    const files = event.target.files;
    if (files && files.length > 0) {
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        
        let loadedCount = 0;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onloadstart = function() {
                // Show progress
            };
            
            reader.onprogress = function(e) {
                if (e.lengthComputable) {
                    const percentLoaded = Math.round((e.loaded / e.total) * 100);
                    progressBar.style.width = percentLoaded + '%';
                }
            };
            
            reader.onload = function(e) {
                const photo = {
                    data: e.target.result,
                    name: file.name || 'photo_' + new Date().getTime() + '.jpg'
                };
                addPhoto(photo);
                
                loadedCount++;
                if (loadedCount === files.length) {
                    progressContainer.style.display = 'none';
                }
            };
            
            reader.onerror = function() {
                updatePhotoStatus('Ошибка при чтении файла', 'error');
                loadedCount++;
                if (loadedCount === files.length) {
                    progressContainer.style.display = 'none';
                }
            };
            
            reader.readAsDataURL(file);
        }
    }
}

function addPhoto(photo) {
    uploadedPhotos.push(photo);
    updatePhotoPreview();
    updatePhotoStatus();
    
    // Check if we've reached the required number of photos
    const requiredCount = parseInt(document.getElementById('calc_KOLICHESTVO').value) || 0;
    if (uploadedPhotos.length >= requiredCount && requiredCount > 0) {
        document.getElementById('photoStatus').classList.remove('error');
        document.getElementById('photoStatus').classList.add('success');
    }
}

function removePhoto(index) {
    uploadedPhotos.splice(index, 1);
    updatePhotoPreview();
    updatePhotoStatus();
}

function updatePhotoPreview() {
    const container = document.getElementById('photoPreviewContainer');
    container.innerHTML = '';
    
    uploadedPhotos.forEach((photo, index) => {
        const preview = document.createElement('div');
        preview.className = 'sn-calc__photo-preview';
        
        const img = document.createElement('img');
        img.src = photo.data;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'sn-calc__photo-remove';
        removeBtn.innerHTML = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removePhoto(index);
        });
        
        preview.appendChild(img);
        preview.appendChild(removeBtn);
        container.appendChild(preview);
    });
}

function updatePhotoStatus(message, type) {
    const statusElement = document.getElementById('photoStatus');
    
    // Если передано сообщение вручную (например, ошибка)
    if (message) {
        statusElement.textContent = message;
        statusElement.className = 'sn-calc__photo-status ' + (type || '');
        return;
    }
    
    // Стандартное отображение количества фото
    if (uploadedPhotos.length === 0) {
        statusElement.textContent = 'Нет загруженных фото';
        statusElement.className = 'sn-calc__photo-status';
    } else {
        statusElement.textContent = `Фотографий: ${uploadedPhotos.length}`;
        statusElement.className = 'sn-calc__photo-status success';
    }
}

function getres_Bablo() {
    const A2 = getNumberValue('calc_KOLICHESTVO');
    const A = getNumberValue('calc_KB_3');
    const A1 = getNumberValue('calc_KB_5');
    const B1 = getNumberValue('calc_LUSTR');
    const C1 = getNumberValue('calc_SVETILNIK');
    const D1 = getNumberValue('calc_SVETILNIK_cena');
	const D2 = getNumberValue('calc_GOFRA');
    const E1 = getNumberValue('calc_BSTAVKA');
    const E2 = getNumberValue('calc_BSTAVKAb');
    const F1 = getNumberValue('calc_TRUB');
    const G = getNumberValue('calc_GARDINA');
	const G1 = getNumberValue('calc_GARDIN');
	const G2 = getNumberValue('calc_BLENDA');
    const G3 = getNumberValue('GARDIN_BP40');
    const G4 = getNumberValue('GARDIN_PK15');
    const G5 = getNumberValue('GARDIN_PK14');
    const G6 = getNumberValue('GARDIN_Sigma');
    const G7 = getNumberValue('GARDIN_AM');
    const G8 = getNumberValue('GARDIN_PODsvetka');
    const J1 = getNumberValue('calc_BRUS_50_50');
    const N1 = getNumberValue('calc_UGL');
    const O1 = getNumberValue('calc_BRUS_100_50');
    const P1 = getNumberValue('calc_RAZDELITEL');
    const S1 = getNumberValue('calc_ALUMIN_PROF');
    const T1 = getNumberValue('calc_ALUMIN_TEN');
    const T2 = getNumberValue('calc_PVX_TEN');
    const U1 = getNumberValue('calc_ALUMIN_TEN_UGL');
    const U2 = getNumberValue('calc_KERAM');
    const K1 = getNumberValue('Paryashchiy');
	const K2 = getNumberValue('Konturnyy');
    const L1 = getNumberValue('LINIEA1');
	const L3 = getNumberValue('LINIEA3');
    const L5 = getNumberValue('LINIEA5');
	const TN = getNumberValue('nakladnoy_t');
	const TV = getNumberValue('vstraivayemyy_t');
    const TM = getNumberValue('magnitnyy_t');
	const RGB = getNumberValue('LENTA_RGB');
    const RGB_CCT = getNumberValue('LENTA_RGB_CCT');
    const LED_t = getNumberValue('LENTA_WHITE_2700');
    const LED_n = getNumberValue('LENTA_WHITE_4000');
	const LED_x = getNumberValue('LENTA_WHITE_6500');
    const LED_POWER = getNumberValue('LENTA_POWER');
    const LED_CONTROLLER = getNumberValue('LENTA_CONTROLLER');
    const Z2 = getNumberValue('calc_ZASVET');
    const V1 = getNumberValue('calc_PULT');

    let price_Long = (A2 * 3930) + (A * 330) + (A1 * 360) + (B1 * 500) + (C1 * 350) + (D1 * C1) + (D2 * 70)+ (E1 * 60) + (E2 * 90) + (F1 * 150) + (G * 170) + (G2 * 150) + (G1 * 500) + (J1 * 800) + (N1 * 50) + (O1 * 800) + (P1 * 1000) + (G3 * 1200) + (G4 * 2500) + (G5 * 3500) + (G6 * 2500) + (G7 * 2000) + (G8 * 1000) + (S1 * 140) + (T1 * 450) + (T2 * 140) + (U1 * 300) + (K1 * 2300) + (K2 * 2300) + (L1 * 3600) + (L3 * 4000) + (L5 * 4200) + (TN * 1400) + (TV * 3100) + (TM * 9900) + (V1 * 1500) + (Z2 * 3800) + (U2 * 300) + (RGB * 500) + (RGB_CCT * 700) + (LED_t * 400) + (LED_n * 400) + (LED_x * 400) + (LED_POWER * 1500) + (LED_CONTROLLER * 1500);
    
    let price_Cassic = (A2 * 4000) + (1.5 * (A * 275)) + (1.5 * (A1 * 340)) + (B1 * 500) + (C1 * 350) + (D1 * C1) + (D2 * 70)+ (E1 * 60) + (E2 * 90) + (F1 * 150) + (G * 170) + (G2 * 150) + (G1 * 500) + (J1 * 800) + (N1 * 50) + (O1 * 800) + (P1 * 1000) + (G3 * 1200) + (G4 * 2500) + (G5 * 3500) + (G6 * 2500) + (G7 * 2000) + (G8 * 1000) + (S1 * 140) + (T1 * 450) + (T2 * 140) + (U1 * 300) + (K1 * 2300) + (K2 * 2300) + (L1 * 3600)+ (L3 * 4000) + (L5 * 4200) + (TN * 1400) + (TV * 3100) + (TM * 9900) + (V1 * 1500) + (Z2 * 3800) + (U2 * 300) + (RGB * 500) + (RGB_CCT * 700) + (LED_t * 400) + (LED_n * 400) + (LED_x * 400) + (LED_POWER * 1500) + (LED_CONTROLLER * 1500);
    
    let price_Evo = (A2 * 4500) + (2 * (A * 260)) + (2 * (A1 * 340)) + (B1 * 500) + (C1 * 350) + (D1 * C1) + (D2 * 70)+ (E1 * 60) + (E2 * 90) + (F1 * 150) + (G * 170) + (G2 * 150) + (G1 * 500) + (J1 * 800) + (N1 * 50) + (O1 * 800) + (P1 * 1000) + (G3 * 1200) + (G4 * 2500) + (G5 * 3500) + (G6 * 2500) + (G7 * 2000) + (G8 * 1000) + (S1 * 140) + (T1 * 450) + (T2 * 140) + (U1 * 300) + (K1 * 2300) + (K2 * 2300) + (L1 * 3600)+ (L3 * 4000) + (L5 * 4200) + (TN * 1400) + (TV * 3100) + (TM * 9900) + (V1 * 1500) + (Z2 * 3800) + (U2 * 300) + (RGB * 500) + (RGB_CCT * 700) + (LED_t * 400) + (LED_n * 400) + (LED_x * 400) + (LED_POWER * 1500) + (LED_CONTROLLER * 1500);
    
    let price_BAUF = (A2 * 5000) + (2.5 * (A * 270)) + (3 * (A1 * 340)) + (B1 * 500) + (C1 * 350) + (D1 * C1) + (D2 * 70)+ (E1 * 60) + (E2 * 90) + (F1 * 150) + (G * 170) + (G2 * 150) + (G1 * 500) + (J1 * 800) + (N1 * 50) + (O1 * 800) + (P1 * 1000) + (G3 * 1200) + (G4 * 2500) + (G5 * 3500) + (G6 * 2500) + (G7 * 2000) + (G8 * 1000) + (S1 * 140) + (T1 * 450) + (T2 * 140) + (U1 * 300) + (K1 * 2300) + (K2 * 2300) + (L1 * 3600)+ (L3 * 4000) + (L5 * 4200) + (TN * 1400) + (TV * 3100) + (TM * 9900) + (V1 * 1500) + (Z2 * 3800) + (U2 * 300) + (RGB * 500) + (RGB_CCT * 700) + (LED_t * 400) + (LED_n * 400) + (LED_x * 400) + (LED_POWER * 1500) + (LED_CONTROLLER * 1500);
    
    let price_Teqtum = (A2 * 6000) + (3 * (A * 330)) + (3 * (A1 * 370)) + (B1 * 500) + (C1 * 350) + (D1 * C1) + (D2 * 70)+ (E1 * 60) + (E2 * 90) + (F1 * 150) + (G * 170) + (G2 * 150) + (G1 * 500) + (J1 * 800) + (N1 * 50) + (O1 * 800) + (P1 * 1000) + (G3 * 1200) + (G4 * 2500) + (G5 * 3500) + (G6 * 2500) + (G7 * 2000) + (G8 * 1000) + (S1 * 140) + (T1 * 450) + (T2 * 140) + (U1 * 300) + (K1 * 2300) + (K2 * 2300) + (L1 * 3600)+ (L3 * 4000) + (L5 * 4200) + (TN * 1400) + (TV * 3100) + (TM * 9900) + (V1 * 1500) + (Z2 * 3800) + (U2 * 300) + (RGB * 500) + (RGB_CCT * 700) + (LED_t * 400) + (LED_n * 400) + (LED_x * 400) + (LED_POWER * 1500) + (LED_CONTROLLER * 1500);

    // Apply discount
    if (currentDiscount !== 0) {
        const discountMultiplier = 1 + (currentDiscount / 100);
        price_Long = Math.round(price_Long * discountMultiplier);
        price_Cassic = Math.round(price_Cassic * discountMultiplier);
        price_Evo = Math.round(price_Evo * discountMultiplier);
        price_BAUF = Math.round(price_BAUF * discountMultiplier);
        price_Teqtum = Math.round(price_Teqtum * discountMultiplier);
    }

    updateMiniTotals([price_Long, price_Cassic, price_Evo, price_BAUF, price_Teqtum]);
    count($('.calcPrice_Long span'), price_Long);
    count($('.calcPrice_Cassic span'), price_Cassic);
    count($('.calcPrice_Evo span'), price_Evo);
    count($('.calcPrice_Teqtum span'), price_Teqtum);
    count($('.calcPrice_BAUF span'), price_BAUF);
    
}

function count(el, val) {
    let start = +el.textContent.replace(/\s/g, '');
    const duration = 500;
    const startTime = performance.now();

    function updateValue(timestamp) {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(start + (val - start) * progress);
        el.textContent = numberWithSpaces(currentValue);

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }

    requestAnimationFrame(updateValue);
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function sendToTelegram(message, photos = []) {
    const token = "7251840019:AAH_bAAv8NWj4gE82hE1hxpueYae15R26zs";
    const chatId = "-1002372099733";

    // Возвращаем Promise
    return new Promise((resolve, reject) => {
        const sendTextMessage = (text) => {
            return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
},
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'HTML'
                })
            });
        };

        if (photos.length > 0) {
            // Для одной фотографии используем sendPhoto без подписи
            if (photos.length === 1) {
                const formData = new FormData();
                const photo = photos[0];
                
                const base64Data = photo.data.split(',')[1];
                const blob = base64ToBlob(base64Data, 'image/jpeg');
                
                formData.append('chat_id', chatId);
                formData.append('photo', blob, photo.name || 'photo.jpg');
                
                fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Фото успешно отправлено:", data);
                    // После отправки фото отправляем текст
                    return sendTextMessage(message);
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Сообщение успешно отправлено:", data);
                    alert("✅ Отправлено");
                    resolve(data);
                })
                .catch(error => {
                    console.error("Ошибка отправки:", error);
                    alert("Ошибка отправки. Проверьте интернет-соединение.");
                    reject(error);
                });
            } 
            // Для нескольких фотографий используем sendMediaGroup
            else {
                const formData = new FormData();
                const media = [];
                
                photos.forEach((photo, index) => {
                    const base64Data = photo.data.split(',')[1];
                    const blob = base64ToBlob(base64Data, 'image/jpeg');
                    const fileName = photo.name || `photo_${index}.jpg`;
                    
                    formData.append(`photo${index}`, blob, fileName);
                    
                    media.push({
                        type: 'photo',
                        media: `attach://photo${index}`,
                    });
                });
                
                formData.append('chat_id', chatId);
                formData.append('media', JSON.stringify(media));
                
                fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Фото успешно отправлены:", data);
                    // После отправки фото отправляем текст
                    return sendTextMessage(message);
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Сообщение успешно отправлено:", data);
                    alert("✅ Отправлено");
                    resolve(data);
                })
                .catch(error => {
                    console.error("Ошибка отправки:", error);
                    alert("Ошибка отправки. Проверьте интернет-соединение.");
                    reject(error);
                });
            }
        } else {
            // Если нет фотографий, отправляем просто сообщение
            sendTextMessage(message)
                .then(response => response.json())
                .then(data => {
                    console.log("Сообщение успешно отправлено:", data);
                    alert("✅ Отправлено");
                    resolve(data);
                })
                .catch(error => {
                    console.error("Ошибка отправки сообщения:", error);
                    alert("Ошибка отправки данных. Проверьте настройки бота и интернет-соединение.");
                    reject(error);
                });
        }
    });
}

// Вспомогательная функция для преобразования base64 в Blob
function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    
    return new Blob(byteArrays, { type: mimeType });
}

function sendToTelegramHandler() {
    if (!updateSendAvailability()) {
        return;
    }
    if (!validateObjectField()) {
        return;
    }
    const calcObject = document.getElementById('calc_object').value.trim();

    // Сохраняем расчет в историю перед отправкой
    saveCurrentCalculation();

    let message = "Данные расчета потолков:\n";
    const fields = [
        { label: "📍Объект", value: calcObject },
        { label: "Подъезд", value: document.getElementById('calc_podezd').value },
        { label: "Этаж", value: document.getElementById('calc_etazh').value },
        { label: "Лифт", value: document.getElementById('calc_lift').checked ? "Есть" : "Нет" },
        { label: "Фактура", value: document.getElementById('calc_faktura').value },
        { label: "Количество", value: document.getElementById('calc_KOLICHESTVO').value, unit: "шт." },
        { label: "Площадь (0-3.5м)", value: document.getElementById('calc_KB_3').value, unit: "м²." },
        { label: "Площадь (4-5м)", value: document.getElementById('calc_KB_5').value, unit: "м²." },
        { label: "Доп.углы", value: document.getElementById('calc_UGL').value, unit: "шт." },
        { label: "Люстры", value: document.getElementById('calc_LUSTR').value, unit: "шт." },
        { label: "Светильники", value: document.getElementById('calc_SVETILNIK').value, unit: "шт." },
		{ label: "Гофра", value: document.getElementById('calc_GOFRA').value, unit: "п.м." },
        { label: "Стоимость свет.", value: document.getElementById('calc_SVETILNIK_cena').value, unit: "руб." },
        { label: "Модель светильника", value: document.getElementById('calc_SVETILNIK_model').value },
        { label: "Вставка белая", value: document.getElementById('calc_BSTAVKA').value, unit: "п.м." },
        { label: "Вставка черная", value: document.getElementById('calc_BSTAVKAb').value, unit: "п.м." },
        { label: "Обвод труб", value: document.getElementById('calc_TRUB').value, unit: "шт." },
        { label: "Гардина 2х.ряд", value: document.getElementById('calc_GARDINA').value, unit: "п.м." },
		{ label: "Бленда", value: document.getElementById('calc_BLENDA').value, unit: "п.м." },
		{ label: "Модель бленды", value: document.getElementById('calc_BLENDA_model').value },
        { label: "Установка гардины", value: document.getElementById('calc_GARDIN').value, unit: "п.м." },
        { label: "Ниша из БП-40", value: document.getElementById('GARDIN_BP40').value, unit: "п.м." },
		{ label: "Ниша из Sigma", value: document.getElementById('GARDIN_Sigma').value, unit: "п.м." },
        { label: "ПК-15(2 02)", value: document.getElementById('GARDIN_PK15').value, unit: "п.м." },
        { label: "ПК-14(2 05)", value: document.getElementById('GARDIN_PK14').value, unit: "п.м." },
		{ label: "Гардина AM-1", value: document.getElementById('GARDIN_AM').value, unit: "п.м." },
		{ label: "Подсветка гардины", value: document.getElementById('GARDIN_PODsvetka').value, unit: "п.м." },
        { label: "Парящий", value: document.getElementById('Paryashchiy').value, unit: "п.м." },
		{ label: "Контурный", value: document.getElementById('Konturnyy').value, unit: "п.м." },
		{ label: "Св.линия 1.5см", value: document.getElementById('LINIEA1').value, unit: "п.м." },
		{ label: "Св.линия 3см", value: document.getElementById('LINIEA3').value, unit: "п.м." },
        { label: "Св.линия 5см", value: document.getElementById('LINIEA5').value, unit: "п.м." },
		{ label: "Лента RGB", value: document.getElementById('LENTA_RGB').value, unit: "п.м." },
        { label: "Лента RGB+W", value: document.getElementById('LENTA_RGB_CCT').value, unit: "п.м." },
        { label: "Лента White 2700K", value: document.getElementById('LENTA_WHITE_2700').value, unit: "п.м." },
        { label: "Лента White 4000K", value: document.getElementById('LENTA_WHITE_4000').value, unit: "п.м." },
		{ label: "Лента White 6500K", value: document.getElementById('LENTA_WHITE_6500').value, unit: "п.м." },
        { label: "Блок питания", value: document.getElementById('LENTA_POWER').value, unit: "шт." },
        { label: "Контроллер", value: document.getElementById('LENTA_CONTROLLER').value, unit: "шт." },
		{ label: "Накладной трек", value: document.getElementById('nakladnoy_t').value, unit: "п.м." },
		{ label: "Встраиваемый трек", value: document.getElementById('vstraivayemyy_t').value, unit: "п.м." },
        { label: "Магнитный трек", value: document.getElementById('magnitnyy_t').value, unit: "п.м." },
        { label: "Контурный засвет", value: document.getElementById('calc_ZASVET').value, unit: "п.м." },
        { label: "Брусок (50*50)", value: document.getElementById('calc_BRUS_50_50').value, unit: "п.м." },
        { label: "Брус (100*50)", value: document.getElementById('calc_BRUS_100_50').value, unit: "п.м." },
        { label: "AL разделитель", value: document.getElementById('calc_RAZDELITEL').value, unit: "п.м." },
        { label: "Багет AL", value: document.getElementById('calc_ALUMIN_PROF').value, unit: "п.м." },
        { label: "Багет AL (теневой)", value: document.getElementById('calc_ALUMIN_TEN').value, unit: "п.м." },
        { label: "Багет ПВХ (теневой)", value: document.getElementById('calc_PVX_TEN').value, unit: "п.м." },
        { label: "Доп.углы (теневой)", value: document.getElementById('calc_ALUMIN_TEN_UGL').value, unit: "п.м." },
        { label: "Керамогранит", value: document.getElementById('calc_KERAM').value, unit: "п.м." },
        { label: "Пульт", value: document.getElementById('calc_PULT').value, unit: "шт." },
    ];

    fields.forEach(field => {
        if (field.value && field.value !== "0") {
            if (field.unit) {
                message += `${field.label}:   ${field.value} ${field.unit}\n`;
            } else {
                message += `${field.label}: ${field.value}\n`;
            }
            if (field.label === "Лифт") {
                message += "\n";
            }
        }
    });

    const proizvoditels = Array.from($$('input[name="proizvoditel"]:checked')).map(el => el.value).join(', ');
    const material = Array.from($$('input[name="material"]:checked')).map(el => el.value).join(', ');
    const otdelka = Array.from($$('input[name="otdelka"]:checked')).map(el => el.value).join(', ');
    const height = document.getElementById('calc_height').value;
    const source = document.getElementById('calc_source').value;
    const note = document.getElementById('calc_note').value.trim();

    message += `\n❗Заметка:\n ${note}\n`;
    message += "\nДополнительные характеристики:\n";
    message += `Материал стен: ${material}\n`;
    message += `Отделка стен: ${otdelka}\n`;
    message += `Высота потолка: ${height} м\n`;
    message += `Откуда узнали: ${source}\n`;
    
    message += "\n";
    message += `LongWai: ${$('.calcPrice_Long span').textContent}\n`;
    message += `MSD Classic: ${$('.calcPrice_Cassic span').textContent}\n`;
    message += `MSD Perfekt: ${$('.calcPrice_Evo span').textContent}\n`;
    message += `BAUF: ${$('.calcPrice_BAUF span').textContent}\n`;
    message += `Teqtum KM2: ${$('.calcPrice_Teqtum span').textContent}\n`;
    message += `\n✅ ${proizvoditels}\n`;
    
    if (currentDiscount !== 0) {
        message += `\nПрименена скидка: ${currentDiscount > 0 ? '+' : ''}${currentDiscount}%\n`;
    }
    
    // Send message with photos if any
        showLoading(true);
    sendToTelegram(message, uploadedPhotos)
        .finally(() => showLoading(false));
    
    // Clear photos after sending
    uploadedPhotos = [];
    updatePhotoPreview();
    updatePhotoStatus();
}

function showLoading(show) {
    const loader = document.getElementById('loadingIndicator') ||
                   document.createElement('div');
    loader.id = 'loadingIndicator';
    loader.className = 'sn-calc__loader';
    loader.innerHTML = `
        <div class="sn-calc__loader-card">
            <div class="sn-calc__spinner"></div>
            <div>Отправка данных...</div>
        </div>
    `;

    if (show) {
        document.body.appendChild(loader);
    } else {
        if (document.getElementById('loadingIndicator')) {
            document.body.removeChild(loader);
        }
    }
}

// Функция для сохранения текущего расчета
function saveCurrentCalculation() {
    const state = getCurrentState();
    const history = getHistory();
    
    // Создаем новый элемент истории
    const historyItem = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        title: state.calc_object || 'Без названия',
        state: state,
        prices: {
            longWai: $('.calcPrice_Long span').textContent,
            msdClassic: $('.calcPrice_Cassic span').textContent,
            msdPerfekt: $('.calcPrice_Evo span').textContent,
            bauf: $('.calcPrice_BAUF span').textContent,
            teqtum: $('.calcPrice_Teqtum span').textContent
        }
    };
    
    // Добавляем в начало массива
    history.unshift(historyItem);
    
    // Ограничиваем количество элементов
    if (history.length > MAX_HISTORY_ITEMS) {
        history.pop();
    }
    
    // Сохраняем в localStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    
    alert('Расчет сохранен в истории');
}

// Функция для получения текущего состояния формы
function getCurrentState() {
    const state = {};
    $$('input, select, textarea').forEach(el => {
        if (!el.id) {
            return;
        }
        if (el.type === 'checkbox') {
            state[el.id] = el.checked;
        } else {
            state[el.id] = el.value;
        }
    });
    return state;
}

// Функция для загрузки истории из localStorage
function getHistory() {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

// Функция для загрузки состояния из истории
function loadFromHistory(historyItem) {
    const state = historyItem.state;
    Object.keys(state).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (el.type === 'checkbox') {
                el.checked = state[id];
            } else {
                el.value = state[id];
            }
        }
    });
    getres_Bablo(); // Пересчитываем
    refreshExtrasAfterStateLoad();
    updateSendAvailability();
    
    // Закрываем панель истории
    closeHistoryPanel();
}

// Функция для отображения истории
function renderHistory() {
    const history = getHistory();
    const historyList = document.getElementById('historyList');
    const searchValue = (document.getElementById('historySearch').value || '').toLowerCase();
    const filtered = history.filter(item => item.title.toLowerCase().includes(searchValue));
    
    if (!historyList) {
        return;
    }

    if (filtered.length === 0) {
        historyList.innerHTML = '<p>История расчетов пуста</p>';
        return;
    }
    
    historyList.innerHTML = '';
    filtered.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'sn-calc__history-item';
        historyItem.dataset.id = item.id;
        historyItem.innerHTML = `
            <div>
                <div class="sn-calc__history-title">${item.title}</div>
                <div class="sn-calc__history-date">${item.date}</div>
            </div>
            <div class="sn-calc__history-actions">
                <button data-action="load">Загрузить</button>
                <button data-action="duplicate">Дублировать</button>
                <button data-action="delete">Удалить</button>
            </div>
        `;
        
        addListener(historyItem.querySelector('[data-action="load"]'), 'click', () => loadFromHistory(item));
        addListener(historyItem.querySelector('[data-action="duplicate"]'), 'click', () => duplicateHistoryItem(item));
        addListener(historyItem.querySelector('[data-action="delete"]'), 'click', () => deleteHistoryItem(item.id));
        
        historyList.appendChild(historyItem);
    });
}

function duplicateHistoryItem(item) {
    const history = getHistory();
    const newTitle = prompt('Название копии:', `${item.title} (копия)`);
    if (newTitle === null) {
        return;
    }
    const newItem = {
        ...item,
        id: Date.now(),
        date: new Date().toLocaleString(),
        title: newTitle || `${item.title} (копия)`
    };
    history.unshift(newItem);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
}

// Функция для удаления элемента истории
function deleteHistoryItem(id) {
    if (!confirm('Вы уверены, что хотите удалить этот расчет из истории?')) {
        return;
    }
    
    let history = getHistory();
    history = history.filter(item => item.id !== id);
    
    // Сохраняем обновленную историю
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    
    // Перерисовываем историю
    renderHistory();
    
    // Если история пуста, скрываем панель
    if (history.length === 0) {
        closeHistoryPanel();
    }
}

// Функция для очистки всей истории
function clearAllHistory() {
    if (!confirm('Вы уверены, что хотите очистить всю историю расчетов? Это действие нельзя отменить.')) {
        return;
    }
    
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
    closeHistoryPanel();
    alert('История расчетов очищена');
}

// Обработчик для кнопки очистки всей истории
addListener(document.getElementById('clearAllHistory'), 'click', clearAllHistory);

    // Функция для очистки всех полей
    function resetAllFields() {
        // Подтверждение перед очисткой
        if (!confirm('Вы уверены, что хотите очистить все поля?')) {
            return;
        }
        
        // Очищаем текстовые поля и поля ввода чисел
        $$('input[type="text"], input[type="number"], textarea').forEach(input => {
            input.value = input.type === 'number' ? '0' : '';
        });
        
        // Сбрасываем выпадающие списки
        $$('select').forEach(select => {
            select.selectedIndex = 0;
        });
        const calcHeight = document.getElementById('calc_height');
        if (calcHeight) {
            calcHeight.value = '2.5';
        }
        
        // Сбрасываем чекбоксы и переключатели
        $$('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Сбрасываем переключатель лифта
        const calcLift = document.getElementById('calc_lift');
        if (calcLift) {
            calcLift.checked = false;
        }
        
        // Сбрасываем скидку
        currentDiscount = 0;
        $$('.sn-calc__discount-option').forEach(opt => opt.classList.remove('active'));
        const defaultDiscount = $('.sn-calc__discount-option[data-discount="0"]');
        if (defaultDiscount) {
            defaultDiscount.classList.add('active');
        }
        updateDiscountStatus();
        
        // Очищаем загруженные фото
        uploadedPhotos = [];
        updatePhotoPreview();
        updatePhotoStatus();
        
        // Пересчитываем результаты
        getres_Bablo();
        updateMiniTotals();
        updateSendAvailability();
    }

    // Обработчик для кнопки очистки
    addListener(document.getElementById('clearBtn'), 'click', resetAllFields);
})();
