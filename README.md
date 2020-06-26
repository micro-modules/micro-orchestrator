# @micro-modules/micro-orchestrator

`MicroOrchestrator` is a small new library to help coordinate different frontend modules, to build entire applications from small building blocks. These `MicroModules` can depend on one another, or be built by composing different submodules.

It's inspired by the `micro-frontends` pattern, and wants to extend it to enable micro modules grouped by funcionality, that can interact from one another with or without clearly defined boundaries.

To achieve this, it uses `InversifyJs` for all dependency management.
