export default function interleave<Type> (arr: Type[], insert: Type): Type[] {
    return arr.flatMap(e => [e, insert]).slice(0, -1);
}