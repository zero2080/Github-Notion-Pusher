import { Client, LogLevel } from '@notionhq/client';
import { info, isDebug } from '@actions/core';
import NotionPageRequest from './notionPageRequest';

const run = async function ({ NOTION_TOKEN, NOTION_DATABASE, NOTION_PEOPLE_ID, TARGET_BRANCH, POSITION, GITHUB }) {

    info('Starting...');


    const notion = new Client({
        auth: NOTION_TOKEN,
        logLevel: isDebug() ? LogLevel.DEBUG : LogLevel.WARN,
    });
    await GITHUB.context.payload.commits.forEach(async commit => {
        if(commit.message.trim().index('[')===0){
            const pageRequest = new NotionPageRequest(NOTION_DATABASE, NOTION_PEOPLE_ID, POSITION, TARGET_BRANCH, commit);
            await notion.pages.create(pageRequest);
        }else{
            info(`Passed Commit : ${commit.message}`);
        }
    })
}

export { run };