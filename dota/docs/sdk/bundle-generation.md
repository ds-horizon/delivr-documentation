---
sidebar_position: 6
---

# Bundle Generation

Before you can deploy OTA updates, you need to generate JavaScript bundles and assets. There are two methods available:

## Method 1: Automated (Recommended)

This method automatically generates bundles during your app's build process. This is the recommended approach as it integrates seamlessly with your existing workflow.

### For Android

Already configured if you followed the [Android Setup](/sdk/android-setup) guide. The bundle is automatically generated when you build your app.

### For iOS

Already configured if you followed the [iOS Setup](/sdk/ios-setup) guide. The bundle is automatically generated during the Xcode build process.

### Output Location

Bundles are automatically placed in the `.dota/` directory:

```
.dota/
├── android/
│   ├── index.android.bundle
│   └── assets/
└── ios/
    ├── main.jsbundle
    └── assets/
```

## Method 2: Manual (CLI Tool)

Use the CLI tool when you need more control over the bundle generation process or need to generate bundles outside of the build process (e.g., for CI/CD pipelines).

### Installation

The CLI tool is included with the SDK installation, but you can also run it directly using npx:

```bash
npx dota bundle --platform <platform>
```

Or add it as a script in your `package.json`:

```json
{
  "scripts": {
    "bundle:android": "dota bundle --platform android",
    "bundle:ios": "dota bundle --platform ios"
  }
}
```

### Basic Usage

#### For Android

```bash
yarn dota bundle --platform android
```

#### For iOS

```bash
yarn dota bundle --platform ios
```

### Available Options

The CLI supports extensive customization:

```bash
dota bundle --platform <platform> [options]
```

#### Options:

| Option | Description | Default |
|--------|-------------|---------|
| `--platform <platform>` | Target platform: `android` or `ios` | **Required** |
| `--bundle-path <path>` | Directory to place the bundle in | `.dota` |
| `--assets-path <path>` | Directory to place assets in | `.dota` |
| `--sourcemap-path <path>` | Directory to place sourcemaps in | `.dota` |
| `--make-sourcemap` | Generate sourcemap for debugging | `false` |
| `--entry-file <file>` | Entry file for your app | `index.ts` |
| `--dev <boolean>` | Development mode | `false` |

### Examples

#### Generate with Source Maps

Useful for debugging production issues:

```bash
yarn dota bundle --platform android --make-sourcemap
```

#### Custom Output Path

```bash
yarn dota bundle \
  --platform ios \
  --bundle-path ./custom-path \
  --assets-path ./custom-path/assets
```

#### Development Bundle

For testing (not recommended for production):

```bash
yarn dota bundle --platform android --dev true
```

#### Custom Entry File

If your entry file is not `index.ts`:

```bash
yarn dota bundle \
  --platform android \
  --entry-file src/index.js
```

### Complete Example

```bash
yarn dota bundle \
  --platform android \
  --bundle-path ./build/codepush \
  --assets-path ./build/codepush/assets \
  --sourcemap-path ./build/codepush/maps \
  --make-sourcemap \
  --entry-file index.ts
```

## Output Files

### For Android

The CLI generates:

- `index.android.bundle` - The optimized Hermes bytecode bundle
- `assets/` - Directory containing any image/font assets
- `index.android.bundle.json` - Source map (if `--make-sourcemap` enabled)

### For iOS

The CLI generates:

- `main.jsbundle` - The optimized Hermes bytecode bundle
- `assets/` - Directory containing any image/font assets  
- `main.jsbundle.json` - Source map (if `--make-sourcemap` enabled)

## Bundle Optimization

### Hermes Bytecode

Bundles are automatically compiled to Hermes bytecode for optimal performance:

- Faster startup times
- Reduced memory footprint
- Smaller bundle sizes

Ensure Hermes is enabled in your React Native configuration:

**For Android** (`android/app/build.gradle`):
```gradle
project.ext.react = [
    enableHermes: true
]
```

**For iOS** (`ios/Podfile`):
```ruby
use_react_native!(
  :hermes_enabled => true
)
```

### Bundle Size Considerations

- **Include only what you need**: Use code splitting and lazy loading
- **Optimize images**: Compress and resize images appropriately
- **Remove unused dependencies**: Regularly audit your node_modules
- **Use production mode**: Always use `--dev false` for production bundles

## Troubleshooting

### Bundle Not Generated

If the bundle isn't being created:

1. Verify the platform parameter is correct (`android` or `ios`)
2. Check that your entry file exists (default: `index.ts`)
3. Ensure you have write permissions to the output directory
4. Look for error messages in the console output

### Missing Assets

If assets are missing from the bundle:

1. Verify asset paths in your code are correct
2. Check that assets are properly imported
3. Ensure assets exist in your project
4. Review the bundler output for asset warnings

### Source Maps Not Working

If source maps aren't generating:

1. Ensure `--make-sourcemap` flag is used
2. Check that the output path is writable
3. Verify source map file was created in the specified directory

### Hermes Compilation Errors

If you encounter Hermes compilation errors:

1. Check your React Native version compatibility
2. Verify Hermes is properly configured
3. Try regenerating node_modules
4. Check for syntax errors in your JavaScript code

## CI/CD Integration

### Example GitHub Actions

```yaml
- name: Generate Android Bundle
  run: |
    yarn dota bundle --platform android --make-sourcemap
    
- name: Generate iOS Bundle  
  run: |
    yarn dota bundle --platform ios --make-sourcemap
```

### Example GitLab CI

```yaml
generate-bundles:
  script:
    - yarn install
    - yarn dota bundle --platform android
    - yarn dota bundle --platform ios
  artifacts:
    paths:
      - .dota/
```

## Next Steps

- [Deploy your bundles](/sdk/releasing-updates)
- [Learn about the DOTA CLI](/cli/overview)
- [Explore advanced deployment strategies](/sdk/advanced)

