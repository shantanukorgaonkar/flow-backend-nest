class RawCode {

    id!: string;
    type!: CodeType;
    code!: string;
    description!: string;
    parentId?: string;
    index!: number;
    length!: number;

}

enum CodeType {
    PYTHON = 'python',
    JAVASCRIPT = 'javascript',
    TYPESCRIPT = 'typescript',
    JAVA = 'java',
    UNKNOWN = 'default'
}


export { RawCode, CodeType }