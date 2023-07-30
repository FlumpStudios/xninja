let globalRunTime = null;

export const setGlobalRuntime = (rt) =>
{
    globalRunTime = rt
}

export const getGlobalRuntime = () =>
{
    return globalRunTime;
}