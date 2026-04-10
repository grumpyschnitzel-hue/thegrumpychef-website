const fs = require('fs');
const appData = process.env.APPDATA + '\\Claude\\';
const devContent = JSON.stringify({ allowDevTools: true });
const configContent = JSON.stringify({
    mcpServers: {
        unipile: {
            command: 'uvx',
            args: ['unipile-linkedin-mcp'],
            env: {
                UNIPILE_DSN: 'https://api27.unipile.com:15707',
                UNIPILE_API_KEY: 'sNmVmiyC.XTaS4KWTRnLxyX3yIibF7NkVIGoiDvgEtMCEteWTov4=',
                UNIPILE_ACCOUNT_ID: 'tfDlvzZCTUKsJgxldHsglA'
            }
        }
    }
}, null, 2);

fs.writeFileSync(appData + 'developer_settings.json', devContent, 'utf8');
fs.writeFileSync(appData + 'claude_desktop_config.json', configContent, 'utf8');
console.log('Files fixed.');
