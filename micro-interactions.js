// 微交互和状态提示功能

class MicroInteractions {
  constructor() {
    this.init()
  }

  init() {
    this.setupPageAnimations()
    this.setupFormValidation()
    this.setupButtonStates()
    this.setupTooltips()
    this.setupRippleEffects()
    this.setupScrollAnimations()
  }

  // 页面加载动画
  setupPageAnimations() {
    document.addEventListener("DOMContentLoaded", () => {
      // 为页面元素添加入场动画
      const elements = document.querySelectorAll(".card, .plan-card, .age-card, .feeling-card")
      elements.forEach((el, index) => {
        el.style.opacity = "0"
        el.style.transform = "translateY(30px)"

        setTimeout(() => {
          el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, index * 100)
      })

      // 标题动画
      const titles = document.querySelectorAll("h1, .hero-title")
      titles.forEach((title) => {
        title.classList.add("animate-fade-in")
      })
    })
  }

  // 表单验证状态
  setupFormValidation() {
    const inputs = document.querySelectorAll('input[type="text"], textarea')

    inputs.forEach((input) => {
      // 实时验证
      input.addEventListener("input", (e) => {
        this.validateField(e.target)
      })

      // 失焦验证
      input.addEventListener("blur", (e) => {
        this.validateField(e.target)
      })

      // 获得焦点时的动画
      input.addEventListener("focus", (e) => {
        e.target.parentElement.classList.add("animate-pulse")
        setTimeout(() => {
          e.target.parentElement.classList.remove("animate-pulse")
        }, 600)
      })
    })
  }

  validateField(field) {
    const value = field.value.trim()
    const isValid = value.length > 0

    // 移除之前的状态
    field.classList.remove("form-field-valid", "form-field-invalid")

    if (value.length > 0) {
      if (isValid) {
        field.classList.add("form-field-valid")
        this.showFieldSuccess(field)
      } else {
        field.classList.add("form-field-invalid")
        this.showFieldError(field)
      }
    }
  }

  showFieldSuccess(field) {
    // 创建成功提示
    const successIcon = document.createElement("div")
    successIcon.className = "success-checkmark"
    successIcon.style.position = "absolute"
    successIcon.style.right = "12px"
    successIcon.style.top = "50%"
    successIcon.style.transform = "translateY(-50%)"

    // 移除旧的图标
    const oldIcon = field.parentElement.querySelector(".success-checkmark, .error-icon")
    if (oldIcon) oldIcon.remove()

    field.parentElement.style.position = "relative"
    field.parentElement.appendChild(successIcon)
  }

  showFieldError(field) {
    field.classList.add("animate-shake")
    setTimeout(() => {
      field.classList.remove("animate-shake")
    }, 500)
  }

  // 按钮状态管理
  setupButtonStates() {
    const buttons = document.querySelectorAll("button, .btn")

    buttons.forEach((button) => {
      // 点击动画
      button.addEventListener("click", (e) => {
        if (!button.classList.contains("btn-loading")) {
          this.createRipple(e)
          this.animateButtonClick(button)
        }
      })

      // 悬停效果
      button.addEventListener("mouseenter", () => {
        if (!button.classList.contains("btn-loading")) {
          button.style.transform = "translateY(-2px)"
        }
      })

      button.addEventListener("mouseleave", () => {
        if (!button.classList.contains("btn-loading")) {
          button.style.transform = "translateY(0)"
        }
      })
    })
  }

  animateButtonClick(button) {
    button.style.transform = "scale(0.95)"
    setTimeout(() => {
      button.style.transform = "translateY(-2px)"
    }, 150)
  }

  // 创建涟漪效果
  createRipple(e) {
    const button = e.currentTarget
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `

    // 添加涟漪动画CSS
    if (!document.querySelector("#ripple-style")) {
      const style = document.createElement("style")
      style.id = "ripple-style"
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  // 设置涟漪效果
  setupRippleEffects() {
    const selectableElements = document.querySelectorAll(".age-card, .feeling-card, .plan-card")

    selectableElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        element.classList.add("selection-ripple")
        setTimeout(() => {
          element.classList.add("selected")
        }, 100)
      })
    })
  }

  // 工具提示
  setupTooltips() {
    const tooltipElements = document.querySelectorAll("[data-tooltip]")

    tooltipElements.forEach((element) => {
      element.classList.add("tooltip")
    })
  }

  // 滚动动画
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
        }
      })
    }, observerOptions)

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll(".feature-card, .form-group, .priority-item")
    animateElements.forEach((el) => observer.observe(el))
  }

  // 显示状态消息
  static showMessage(message, type = "info", duration = 3000) {
    const messageEl = document.createElement("div")
    messageEl.className = `status-message ${type}`
    messageEl.textContent = message

    document.body.appendChild(messageEl)

    // 触发显示动画
    setTimeout(() => {
      messageEl.classList.add("show")
    }, 100)

    // 自动隐藏
    setTimeout(() => {
      messageEl.classList.remove("show")
      setTimeout(() => {
        messageEl.remove()
      }, 300)
    }, duration)
  }

  // 按钮加载状态
  static setButtonLoading(button, loading = true) {
    if (loading) {
      button.classList.add("btn-loading")
      button.disabled = true
      button.dataset.originalText = button.textContent
      button.textContent = "处理中..."
    } else {
      button.classList.remove("btn-loading")
      button.disabled = false
      if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText
      }
    }
  }

  // 按钮成功状态
  static setButtonSuccess(button, duration = 2000) {
    button.classList.add("btn-success")
    const originalText = button.textContent
    button.textContent = "完成！"

    setTimeout(() => {
      button.classList.remove("btn-success")
      button.textContent = originalText
    }, duration)
  }
}

// 初始化微交互
const microInteractions = new MicroInteractions()

// 全局函数供其他脚本使用
window.showMessage = MicroInteractions.showMessage
window.setButtonLoading = MicroInteractions.setButtonLoading
window.setButtonSuccess = MicroInteractions.setButtonSuccess
