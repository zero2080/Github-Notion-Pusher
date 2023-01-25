const { Client, LogLevel } = require('@notionhq/client');
const core = require('@actions/core');
const NotionPageRequest = require('./notionPageRequest');

const run = async function ({ NOTION_TOKEN, NOTION_DATABASE,TARGET_BRANCH,POSITION, GITHUB }) {

    core.info('Starting...');
    

    const notion = new Client({
        auth: NOTION_TOKEN,
        logLevel: core.isDebug() ? LogLevel.DEBUG : LogLevel.WARN,
    });
    await GITHUB.context.payload.commits.forEach(async commit=>{
        const pageRequest = new NotionPageRequest(NOTION_DATABASE,POSITION,TARGET_BRANCH,commit);
        await notion.pages.create(pageRequest);
    })
}

exports.run = run;