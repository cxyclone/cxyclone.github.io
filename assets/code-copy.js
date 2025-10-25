document.addEventListener('DOMContentLoaded', function() {
  const containers = document.querySelectorAll('.book-code-copy-container');
  
  containers.forEach(function(container) {
    const copyButton = container.querySelector('.book-code-copy');
    const preElement = container.querySelector('pre');
    
    if (preElement) {
      copyButton.addEventListener('click', function() {
        // 获取第二个td（包含代码内容的那个）
        const table = preElement.closest('table');
        if (table) {
          const tds = table.querySelectorAll('td');
          if (tds.length >= 2) {
            const codeTd = tds[1]; // 第二个td包含代码
            const codeLines = [];
            
            // 获取所有显示为flex的行
            const flexLines = codeTd.querySelectorAll('span[style*="display:flex"]');
            
            flexLines.forEach(function(line) {
              let lineText = '';
              // 遍历行中的每个span元素
              for (let i = 0; i < line.children.length; i++) {
                const child = line.children[i];
                const style = child.getAttribute('style') || '';
                
                // 跳过行号（有user-select:none和margin-right:.4em的样式）
                if (style.includes('user-select:none') && style.includes('margin-right:.4em')) {
                  continue;
                }
                
                // 添加非行号内容
                lineText += child.textContent;
              }
              
              codeLines.push(lineText);
            });
            
            const code = codeLines.join('');
            copyToClipboard(code, copyButton);
            return;
          }
        }
        
        // 如果不是表格布局，使用备用方法
        const code = preElement.textContent.trim();
        copyToClipboard(code, copyButton);
      });
    }
  });
  
  function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(function() {
      const originalText = button.textContent;
      button.textContent = '复制成功!';
      
      setTimeout(function() {
        button.textContent = originalText;
      }, 2000);
    }).catch(function(err) {
      console.error('复制失败:', err);
      // 备用方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '0';
      textArea.style.top = '0';
      textArea.style.opacity = '0';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        const originalText = button.textContent;
        button.textContent = '复制成功!';
        
        setTimeout(function() {
          button.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('备用复制方法也失败:', err);
      }
      
      document.body.removeChild(textArea);
    });
  }
});