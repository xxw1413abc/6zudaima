// 页面加载动画
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);
});

// 移动端菜单切换
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 关闭移动端菜单
            navLinks.classList.remove('active');
        }
    });
});

// 返回顶部
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 主题切换
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// 检查本地存储的主题设置
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// 技能进度条动画
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// 滚动动画
function animateOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.85) {
            item.classList.add('visible');
        }
    });
}

// 项目过滤
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // 过滤项目
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 表单提交
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // 这里可以添加表单提交的逻辑
    console.log('表单提交:', formData);
    
    // 显示成功消息
    alert('消息已发送！我会尽快回复您。');
    
    // 重置表单
    contactForm.reset();
});

// 初始化
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
window.addEventListener('load', animateSkills);
// AI Resume Assistant Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应内容
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // 结果Tab切换功能
    const resultTabBtns = document.querySelectorAll('.result-tab-btn');
    resultTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新按钮状态
            resultTabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应内容
            document.querySelectorAll('.result-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-result`).classList.add('active');
        });
    });
    
    // 文件拖放功能
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('fileElem');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files } });
    }
    
    function handleFiles(e) {
        const files = e.target.files;
        if (files.length) {
            processFile(files[0]);
        }
    }
    
    function processFile(file) {
        console.log('Processing file:', file.name);
        // 这里可以添加文件处理逻辑
        showLoading();
        
        // 模拟API调用延迟
        setTimeout(() => {
            hideLoading();
            showResults();
            populateSampleData();
        }, 2000);
    }
    
    // 表单提交处理
    const resumeForm = document.getElementById('resumeForm');
    resumeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const jobTitle = document.getElementById('jobTitle').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        
        if (!jobTitle || !experience || !skills) {
            alert('请填写所有必填字段');
            return;
        }
        
        showLoading();
        
        // 模拟API调用延迟
        setTimeout(() => {
            hideLoading();
            showResults();
            populateSampleData();
        }, 2000);
    });
    
    function showLoading() {
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        
        btnText.textContent = '分析中...';
        btnLoader.style.display = 'block';
    }
    
    function hideLoading() {
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        
        btnText.textContent = '分析并优化';
        btnLoader.style.display = 'none';
    }
    
    function showResults() {
        document.getElementById('resultSection').style.display = 'block';
        // 滚动到结果部分
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    }
    
    function populateSampleData() {
        // 这里可以替换为实际的API响应数据
        document.getElementById('originalContent').textContent = "负责公司区块链项目的开发工作，使用Solidity编写智能合约。";
        document.getElementById('improvedContent').textContent = "作为区块链开发工程师，设计并实现了3个去中心化应用(DApp)的智能合约系统，使用Solidity编写了高效、安全的合约代码，通过单元测试和审计确保合约安全性，降低了30%的gas费用消耗。";
        
        const keywords = ["Solidity", "智能合约", "以太坊", "Web3.js", "区块链安全", "DApp开发", "Truffle", "Hardhat"];
        const keywordTags = document.getElementById('keywordTags');
        keywordTags.innerHTML = '';
        
        keywords.forEach(keyword => {
            const tag = document.createElement('span');
            tag.className = 'keyword-tag';
            tag.textContent = keyword;
            keywordTags.appendChild(tag);
        });
        
        document.getElementById('keywordMatch').style.width = '78%';
        document.getElementById('matchScore').textContent = '78% 匹配度 (优秀)';
    }
    
    // 导出简历功能
    document.getElementById('exportBtn').addEventListener('click', function() {
        alert('简历导出功能即将实现！');
        // 这里可以添加实际的导出逻辑
    });
    document.addEventListener('DOMContentLoaded', function () {
        const chatContainer = document.getElementById("chat-messages");
        const userInput = document.getElementById("user-input");
        const sendBtn = document.getElementById("send-btn");
      
        let messages = [{
          role: "system",
          content: "你好，我是你的助手。请问有什么我可以帮助你的吗？",
        }];
      
        function sendMessage() {
          const userMessage = userInput.value.trim();
          if (!userMessage) return;
      
          userInput.value = "";
          userInput.focus();
          appendMessage("user", userMessage);
          messages.push({ role: "user", content: userMessage });
      
          const loadingDiv = document.createElement("div");
          loadingDiv.className = "message assistant";
          loadingDiv.innerHTML = `
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          `;
          chatContainer.appendChild(loadingDiv);
          chatContainer.scrollTop = chatContainer.scrollHeight;
      
          axios.post('/api/chat', { messages })
            .then((response) => {
              chatContainer.removeChild(loadingDiv);
              appendMessage("assistant", response.data.message);
              messages.push({
                role: response.data.role,
                content: response.data.message
              });
            });
        }
      
        function appendMessage(role, content) {
          const messageDiv = document.createElement("div");
          messageDiv.className = `message ${role}`;
          messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
          chatContainer.appendChild(messageDiv);
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      
        sendBtn.addEventListener("click", sendMessage);
      
        userInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        });
      
        userInput.addEventListener("input", function () {
          this.style.height = "auto";
          this.style.height = this.scrollHeight < 120 ? this.scrollHeight + 'px' : "120px";
        });
      });
});
