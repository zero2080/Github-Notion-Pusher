import { Client, LogLevel } from '@notionhq/client';
import { info, isDebug } from '@actions/core';
import NotionPageRequest from './notionPageRequest';

const run = async function ({ NOTION_TOKEN, NOTION_DATABASE, TARGET_BRANCH, POSITION, GITHUB }) {

    info('Starting...');


    const notion = new Client({
        auth: NOTION_TOKEN,
        logLevel: isDebug() ? LogLevel.DEBUG : LogLevel.WARN,
    });
    await GITHUB.context.payload.commits.forEach(async commit => {
        const pageRequest = new NotionPageRequest(NOTION_DATABASE, POSITION, TARGET_BRANCH, commit);
        await notion.pages.create(pageRequest);
    })
}

export { run };